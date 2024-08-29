"use client";

import api, { baseURL } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, BudgetList, TravelersList } from "@/constants/options";
import { useAuth } from "@/context/Auth";
import { chatSession } from "@/service/AIModal";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import { json } from "stream/consumers";

const CreateTrip = () => {
  const [ok, setOk] = useState(false);
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const handleInputChange = (name: string, value: any) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const { authState: token } = useAuth();

  const authToken = token.token;

  const router = useRouter();

  const onGenerateTrip = async () => {
    if (
      !formData?.noOfDays ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{noOfDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    setLoading(false);
    // console.log(result?.response?.text());
    await saveItinerary(result?.response?.text());
  };

  const saveItinerary = async (data: any) => {
    // const loadingToast = toast.loading("Generating Itinerary...");
    setLoading(true);
    try {
      //rate limiting feature -
      const rateLimitCheck = await api.get(`${baseURL}/api/key/v2/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const status = rateLimitCheck.data.status;

      if (status == 429) {
        setOk(true);
      }

      if (ok) {
        toast.error("API limit exceeded. Please try again after 12pm!");
        setOk(false);
        router.push("/my-trips");
        return;
      }

      // toast.dismiss(loadingToast);
      const jsonData = JSON.parse(data);
      const response = await api.post(`${baseURL}/api/itinerary/v2`, jsonData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.data) {
        throw new Error("No data received from the server");
      }
      const id = response.data.data._id;
      toast.success("Itinerary generated successfully!");
      router.push(`/view-trip/${id}`);
      // Handle successful response here
    } catch (error: any) {
      // toast.dismiss(loadingToast);
      console.error("Error saving itinerary:", error.message);
      toast.error("Failed to save itinerary. Please try again.");
    }
  };

  useEffect(() => {
    // console.log(formData);
  }, [formData]);

  if (!authToken) {
    router.push("/login");
  }

  return (
    <div className="p-4 md:p-0 md:max-w-[60%] w-full mx-auto mt-10">
      <h2 className="font-semibold text-3xl">
        Tell us your travel preferences
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a personalized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium ">
            What is the destination of your choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v: any) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning to spend?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div className="">
          <h2 className="text-xl my-3 font-medium "> What is your budget?</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-3 gap-5 mt-5">
            {BudgetList.map((item, i) => (
              <div
                onClick={() => handleInputChange("budget", item.title)}
                className={`border cursor-pointer rounded-lg hover:shadow-lg p-4 ${
                  formData?.budget === item.title && "shadow-lg border-black"
                }`}
                key={i}
              >
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h2 className="text-xl my-3 font-medium ">
            With whom are you planning to travel?
          </h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-3 gap-5 mt-5">
            {TravelersList.map((item, i) => (
              <div
                onClick={() => handleInputChange("traveler", item.people)}
                className={`border cursor-pointer rounded-lg hover:shadow-lg p-4 ${
                  formData?.traveler === item.people && "shadow-lg border-black"
                }`}
                key={i}
              >
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex justify-center">
          <Button
            disabled={loading}
            className="text-white "
            onClick={onGenerateTrip}
          >
            {loading
              ? // <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
                "Generating Trip Itinreary...."
              : "Generate Trip Itinreary"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;

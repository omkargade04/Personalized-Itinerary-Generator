"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import api, { baseURL } from "../api/api";
import { chatSession } from "../service/AIModal";
import { AI_PROMPT } from "../constants/options";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/Auth";
import DotPattern from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";
import ShineBorder from "./magicui/shine-border";

export default function ItineraryGenerator() {
  const [formData, setFormData] = useState({
    destination: {
      label: "",
    },
    days: 7,
    budget: 5000,
    travelers: "2",
    startDate: new Date(),
  });

  const [ok, setOk] = useState(false);
  const [place, setPlace] = useState();
  //   const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const { authState: token } = useAuth();

  const authToken = token.token;

  const router = useRouter();

  const onGenerateTrip = async () => {
    // const loadingToast = toast.loading("Generating itinreary...");
    setLoading(true);
    if (
      !formData?.days ||
      !formData?.destination ||
      !formData?.budget ||
      !formData?.travelers
    ) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }
    // toast.dismiss(loadingToast);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.destination?.label.toString() || ""
    )
      .replace("{noOfDays}", formData?.days?.toString() || "")
      .replace("{traveler}", formData?.travelers.toString())
      .replace("{budget}", formData?.budget.toString());

    if (!FINAL_PROMPT) {
      toast.error("Error creating itinerary!");
      setLoading(false);
      return;
    }

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(FINAL_PROMPT);
    setLoading(false);
    // console.log(result?.response?.text());
    await saveItinerary(result?.response?.text());
  };

  const saveItinerary = async (data: any) => {
    // const loadingToast = toast.loading("Generating Itinerary...");
    setLoading(true);
    try {
      //rate limiting feature -
      //   toast.dismiss(loadingToast);
      const jsonData = JSON.parse(data);
      const response = await api.post(`${baseURL}/api/itinerary/v2`, jsonData);
      if (!response.data) {
        setLoading(false);
        throw new Error("No data received from the server");
      }
      const id = response.data.data._id;
      toast.success("Itinerary generated successfully!");
      //   toast.dismiss(loadingToast);
      router.push(`/view-trip/${id}`);
      setLoading(false);
      // Handle successful response here
    } catch (error: any) {
      //   toast.dismiss(loadingToast);
      console.error("Error saving itinerary:", error.message);
      setLoading(false);
      toast.error("Failed to save itinerary. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log(formData);
  }, [formData]);

  const handleInputChange = (name: string, value: any) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value[0],
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative flex h-full w-full bg-white items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
        <ShineBorder
          className="relative flex h-[500px] w-[100vh] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <Card className="w-full max-w-2xl ">
            <CardHeader className="flex justify-center items-center">
              <CardTitle className="text-2xl">Itinerary Generator</CardTitle>
              <CardDescription>
                Plan your perfect trip with our interactive tool
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onGenerateTrip} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <GooglePlacesAutocomplete
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
                    selectProps={{
                      value: place,
                      onChange: (v: any) => {
                        setPlace(v);
                        handleInputChange("destination", v);
                      },
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days">Number of Days: {formData.days}</Label>
                  <Slider
                    id="days"
                    min={1}
                    max={30}
                    step={1}
                    value={[formData.days]}
                    onValueChange={(value: any) =>
                      handleSliderChange("days", value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget: ${formData.budget}</Label>
                  <Slider
                    id="budget"
                    min={500}
                    max={20000}
                    step={500}
                    value={[formData.budget]}
                    onValueChange={(value: any) =>
                      handleSliderChange("budget", value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="travelers">Number of Travelers</Label>
                  <Select
                    value={formData.travelers}
                    onValueChange={(value: any) =>
                      handleSelectChange("travelers", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of travelers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, "More than 6"].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Traveler" : "Travelers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loading}
                className="text-white w-full z-10"
                onClick={onGenerateTrip}
              >
                {loading
                  ? "Generating Trip Itinreary...."
                  : "Generate Trip Itinreary"}
              </Button>
            </CardFooter>
          </Card>
        </ShineBorder>

        <DotPattern
          width={15}
          height={15}
          cx={2}
          cy={2}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />
      </div>
    </div>
  );
}

import { Devices } from "@/types/spotifytype";

// Get Available Devices
const getAvailableDevices = (devices: Devices | null) => {
  const devices_list = devices?.devices || [];
  // Add more if needed
  return {
    devices_list,
  };
};

export default getAvailableDevices;

interface SpotifyDevices {
  devices: Device[];
}

interface Device {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  supports_volume: boolean;
  type: string;
  volume_percent: number;
}

// Get Available Devices
const getSpotifyDevices = (devices: SpotifyDevices | null) => {
  const device = devices?.devices;

  const device_id = devices?.devices[0]?.id;
  const device_name = devices?.devices[0]?.name;

  return {
    device,
    device_id,
    device_name,
  };
};

export default getSpotifyDevices;

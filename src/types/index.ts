export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: {
    countryCode: string;
    number: string;
  };
  address: {
    street: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export interface RootState {
  contacts: Contact[];
}
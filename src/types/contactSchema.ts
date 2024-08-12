import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").refine(
    (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    { message: "Invalid email format" }
  ),
  phone: z.object({
    countryCode: z.string().min(1, "Country code is required"),
    number: z.string().length(10, "Phone number must be exactly 10 digits")
      .refine(
        (number) => /^\d{10}$/.test(number),
        { message: "Phone number must contain only digits" }
      ),
  }),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().length(6, "Zipcode must be exactly 6 digits"),
    geo: z.object({
      lat: z.string(),
      lng: z.string()
    })
  })
});

export type ContactFormData = z.infer<typeof contactSchema>;
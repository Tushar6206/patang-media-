import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Smooth scrolling to section
export const scrollToSection = (sectionId: string): void => {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 80, // Adjust for navbar height
      behavior: 'smooth',
    });
  }
};

// Contact form interface
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}

// Newsletter form interface
export interface NewsletterData {
  email: string;
}

// Validator for email
export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Validator for contact form
export const validateContactForm = (data: ContactFormData): { valid: boolean; errors: Partial<ContactFormData> } => {
  const errors: Partial<ContactFormData> = {};
  
  if (!data.name.trim()) errors.name = "Name is required";
  if (!isValidEmail(data.email)) errors.email = "Valid email is required";
  if (!data.interest) errors.interest = "Please select an interest";
  if (!data.message.trim()) errors.message = "Message is required";
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

// Validator for newsletter
export const validateNewsletter = (data: NewsletterData): { valid: boolean; error?: string } => {
  if (!isValidEmail(data.email)) {
    return { valid: false, error: "Valid email is required" };
  }
  return { valid: true };
};

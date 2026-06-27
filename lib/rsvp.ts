export interface RSVPData {
  guestName: string;
  mobileNumber: string;
  guestCount: number;
}

export interface RSVPErrors {
  guestName?: string;
  mobileNumber?: string;
  guestCount?: string;
}

export function buildWhatsAppMessage(data: RSVPData): string {
  return [
    "🌟 AURE STUDIO \u2013 Exclusive Launch High Tea RSVP",
    "",
    `Name:`,
    data.guestName,
    "",
    `Mobile:`,
    data.mobileNumber,
    "",
    `Number of Guests:`,
    String(data.guestCount),
    "",
    `I am delighted to confirm my attendance for the Exclusive Launch High Tea.`,
    "",
    `Looking forward to celebrating with the AURE STUDIO team.`,
  ].join("\n");
}

import { siteConfig } from "./siteConfig";

export function openWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${siteConfig.rsvp.whatsappNumber}?text=${encoded}`;
  window.open(url, "_blank");
}

export function validatePhone(phone: string): boolean {
  return /^\d{10,15}$/.test(phone);
}

export function validateName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length >= 3 && trimmed.length <= 60;
}

export function validateGuestCount(count: number): boolean {
  return count >= 1 && count <= 10;
}

export function validateForm(data: RSVPData): RSVPErrors {
  const errors: RSVPErrors = {};
  const trimmedName = data.guestName.trim();

  if (!trimmedName) {
    errors.guestName = "Please enter your full name";
  } else if (trimmedName.length < 3) {
    errors.guestName = "Name must be at least 3 characters";
  } else if (trimmedName.length > 60) {
    errors.guestName = "Name must be 60 characters or fewer";
  }

  if (!data.mobileNumber) {
    errors.mobileNumber = "Please enter your mobile number";
  } else if (!/^\d+$/.test(data.mobileNumber)) {
    errors.mobileNumber = "Numbers only, please";
  } else if (!validatePhone(data.mobileNumber)) {
    errors.mobileNumber = "Enter a valid 10\u201315 digit number";
  }

  if (data.guestCount < 1 || data.guestCount > 10) {
    errors.guestCount = "Number of guests must be between 1 and 10";
  }

  return errors;
}

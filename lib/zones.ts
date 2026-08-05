/**
 * The exercise catalogue, shared by the Areas section and llms.txt.
 *
 * Zones and exercise names come straight from the app's catalogue
 * (dietly_backend/app/services/glow_catalogue.py) — keep them in step.
 *
 * `tint` is presentation, but it rides along with the row it decorates so the
 * catalogue stays one list rather than a list plus a parallel lookup table.
 */

export type Zone = {
  zone: string;
  tint: string;
  exercises: string[];
};

export const zones: Zone[] = [
  {
    zone: "Forehead & brow",
    tint: "from-rose-light/15 to-rose/10",
    exercises: ["Forehead Smoother", "Brow Lift Press", "Frown Line Release"],
  },
  {
    zone: "Eyes",
    tint: "from-orchid/15 to-orchid/5",
    exercises: ["Eye Circle Press", "Lower Lid Strengthener", "Temple Smooth"],
  },
  {
    zone: "Cheeks",
    tint: "from-coral/15 to-coral/5",
    exercises: ["Cheek Lifter", "Cheek Puff Pass", "Smile Smoother"],
  },
  {
    zone: "Lips",
    tint: "from-rose/15 to-blush/30",
    exercises: ["Lip Plump Press", "Lip Line Smoother"],
  },
  {
    zone: "Jawline",
    tint: "from-champagne/25 to-champagne/5",
    exercises: ["Jawline Sculptor", "Chin Lift Hold", "Fish Face Pull"],
  },
  {
    zone: "Neck",
    tint: "from-mint/15 to-mint/5",
    exercises: ["Neck Toner", "Platysma Stretch", "Neck Release Roll"],
  },
  {
    zone: "Nose",
    tint: "from-orchid/10 to-blush/25",
    exercises: ["Nose Tension Release"],
  },
];

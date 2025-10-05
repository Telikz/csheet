import type { CardProps } from "@/components/card.tsx";
import type { StatProps } from "@/components/stat-row.tsx";

export const stats: StatProps[] = [
	{
		icon: "💪",
		name: "Strength",
		level: 5,
		desc: "I can push through any challenge with resilience and determination.",
	},
	{
		icon: "🤸",
		name: "Dexterity",
		level: 4,
		desc: "I adapt well, but stress can make me rigid at times.",
	},
	{
		icon: "🛡️",
		name: "Constitution",
		level: 6,
		desc: "Strong resilience — not easily shaken physically or mentally.",
	},
	{
		icon: "🧠",
		name: "Intelligence",
		level: 4,
		desc: "Analytical, solution‑oriented; slower under tight time pressure.",
	},
	{
		icon: "🌌",
		name: "Wisdom",
		level: 5,
		desc: "Self‑awareness, life experience, a nuanced worldview.",
	},
	{
		icon: "✨",
		name: "Charisma",
		level: 4,
		desc: "Some struggles with assertiveness, improving steadily.",
	},
];

export const skills: CardProps[] = [
	{
		title: "⚖️ Responsibility (4/6)",
		desc: "Working on ownership in daily tasks (dishwashing, helping in crises).",
		descLong: "I am responsible",
	},
	{
		title: "🔮 Perspective (5/6)",
		desc: "Strong ability to see value in many worldviews.",
		descLong: "I am responsible",
	},
	{
		title: "🤝 Allies & Companions (4/6)",
		desc: "Supportive partner & friends, learning to lean on them more.",
		descLong: "I am responsible",
	},
	{
		title: "🧘 Meditation (5/6)",
		desc: "Daily meditation anchors thrive‑mode & resets stress.",
		descLong: "I am responsible",
	},
];

export const paths: CardProps[] = [
	{
		title: "Responsibility Path",
		desc: "Own micro actions · Replace blame with solutions · Reflect & Grow",
		descLong: "I am responsible",
	},
	{
		title: "Perspective Path",
		desc: "Seek diverse POVs · Discover core values & beliefs",
		descLong: "I am responsible",
	},
	{
		title: "Thrive Mode Ritual 🌙",
		desc: "Daily meditation · Hourly breaks · No late projects · Tea + calm evening",
		descLong: "I am responsible",
	},
];

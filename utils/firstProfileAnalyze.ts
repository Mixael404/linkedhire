import { ResolvedFormData } from "@/app/api/generate-profile/route";

export function firstProfileAnalyze(formData: ResolvedFormData) {
    const role = formData.role;
    const grade = getGrade(formData.experience);

    const headline = `${role} |`;
    const about = `I am a ${grade} ${role.toLowerCase()} with experience in `;

    return {
        headline,
        about,
    }
}

function getGrade(experience: string) {
    switch (experience) {
        case "0-1":
            return "junior";
        case "1-3":
            return "middle";
        case "3-5":
            return "senior";
        case "5+":
            return "senior/lead";
        default:
            return "";
    }
}
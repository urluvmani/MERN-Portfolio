export const dynamic = "force-dynamic";
import ClientAboutView from "@/components/client-view/about";
import ClientContactView from "@/components/client-view/contact";
import ClientExperienceAndEducationView from "@/components/client-view/experience";
import ClientHomeView from "@/components/client-view/home";
import ClientProjectView from "@/components/client-view/project";

export async function extractAllDatas(currentSection) {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "";

  try {
    const res = await fetch(`${baseUrl}/api/${currentSection}/get`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("❌ Fetch failed with status:", res.status);
      return [];
    }

    const jsonData = await res.json();
    return jsonData?.data || [];
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    return [];
  }
}



export default async function Home() {
  const homeSectionData = await extractAllDatas("home");
  const aboutSectionData = await extractAllDatas("about");
  const experienceSectionData = await extractAllDatas("experience");
  const educationSectionData = await extractAllDatas("education");
  const projectSectionData = await extractAllDatas("project");

  return (
    <div>
      <ClientHomeView data={homeSectionData} />
      <ClientAboutView
        data={
          aboutSectionData && aboutSectionData.length ? aboutSectionData[0] : []
        }
      />
      <ClientExperienceAndEducationView
        educationData={educationSectionData}
        experienceData={experienceSectionData}
      />
      <ClientProjectView data={projectSectionData} />
      <ClientContactView />
    </div>
  );
}

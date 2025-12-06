// app/workshops/[id]/page.tsx
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { 
  GetWorkshopById, 
  CheckUserRegistration, 
  GetAllWorkshops 
} from "@/app/(clientside)/actions/workshops";
import { WorkshopDetail } from "@/app/(clientside)/components/workshopdetails";
import { Metadata } from "next";

// Generate metadata for SEO
export async function generateMetadata({ params }: WorkshopPageProps): Promise<Metadata> {
  const { id } = await params;
  const workshop = await GetWorkshopById(id);

  if (!workshop) {
    return {
      title: "Workshop Not Found",
    };
  }

  return {
    title: workshop.title,
    description: workshop.description,
    openGraph: {
      title: workshop.title,
      description: workshop.description,
      images: [workshop.thumbnail],
    },
  };
}

interface WorkshopPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for all workshops
export async function generateStaticParams() {
  const workshops = await GetAllWorkshops();
  
  return workshops.map((workshop) => ({
    id: workshop.id,
  }));
}

// Enable ISR with revalidation
export const revalidate = false; // Only revalidate on-demand via revalidatePath
export const dynamic = 'force-static'; // Force static generation
export const dynamicParams = true; // Allow new workshops to be generated on-demand

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const session = await auth();
  const { id } = await params;

  const workshop = await GetWorkshopById(id);

  if (!workshop) {
    notFound();
  }

  let isRegistered = false;
  let userRegistration = null;

  if (session?.user?.email) {
    const registration = await CheckUserRegistration(
      session.user.email,
      id
    );
    isRegistered = !!registration;
    userRegistration = registration;
  }

  // Serialize the workshop data to ensure proper date handling
  const serializedWorkshop = {
    ...workshop,
    date: workshop.date.toISOString(),
    updatedAt: workshop.updatedAt.toISOString(),
  };

  return (
    <WorkshopDetail
      workshop={serializedWorkshop as any}
      isRegistered={isRegistered}
      userRegistration={userRegistration}
      userEmail={session?.user?.email || null}
    />
  );
}
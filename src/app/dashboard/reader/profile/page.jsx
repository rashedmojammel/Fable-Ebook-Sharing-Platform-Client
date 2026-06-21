import { ShieldKeyhole } from "@gravity-ui/icons";
import { Card } from "@heroui/react";

import { getUserSession } from "@/lib/core/session";
import ProfileForm from "./ProfileForm";

const page = async () => {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="p-8">
        <p className="text-gray-500">
          You need to be signed in to view this page.
        </p>
      </div>
    );
  }

  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-500 mt-1">
            Manage your account details and security.
          </p>
        </div>

        {/* Editable form (membership card + fields) */}
        <ProfileForm user={user} joined={joined} />
      </div>
    </div>
  );
};

export default page;
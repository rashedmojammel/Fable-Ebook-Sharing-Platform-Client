"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label, TextField } from "@heroui/react";
import { Person, Picture, Eye, EyeSlash, ShieldKeyhole, At, Calendar } from "@gravity-ui/icons";
import { updateUser, changePassword } from "@/lib/auth-client";

export default function ProfileForm({ user, joined }) {
  const router = useRouter();

  const [name, setName] = useState(user.name || "");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(user.image || null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const wantsPasswordChange = currentPassword || newPassword || confirmPassword;
  const memberId = user?.id ? user.id.slice(0, 8).toUpperCase() : "—";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Name can't be empty.");
      return;
    }

    if (wantsPasswordChange) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setError("Fill in all three password fields, or leave them all blank.");
        return;
      }
      if (newPassword.length < 8) {
        setError("New password must be at least 8 characters.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("New password and confirmation don't match.");
        return;
      }
    }

    try {
      setLoading(true);

      let imageUrl = user.image || undefined;

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);

        const uploadRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: "POST", body: imageFormData }
        );

        const imageResult = await uploadRes.json();

        if (!imageResult.success) {
          throw new Error("Image upload failed");
        }

        imageUrl = imageResult.data.url;
      }

      const { error: profileError } = await updateUser({
        name,
        image: imageUrl,
      });

      if (profileError) {
        setError(profileError.message || "Failed to update profile.");
        return;
      }

      if (wantsPasswordChange) {
        const { error: passwordError } = await changePassword({
          currentPassword,
          newPassword,
          revokeOtherSessions: true,
        });

        if (passwordError) {
          setError(passwordError.message || "Profile saved, but password change failed.");
          return;
        }

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }

      setSuccess(
        wantsPasswordChange
          ? "Profile and password updated. You've been signed out of other devices."
          : "Profile updated successfully."
      );
      setImageFile(null);
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
      `}</style>

      {/* ===== Membership card ===== */}
      <div
        className="relative overflow-hidden rounded-3xl p-8 mb-6"
        style={{
          background: "linear-gradient(135deg, #11131F 0%, #1C2036 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
        />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <label className="relative cursor-pointer group shrink-0">
              {preview ? (
                <img
                  src={preview}
                  alt={name}
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-[#C9A227]/60"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white/10 ring-2 ring-[#C9A227]/60 flex items-center justify-center">
                  <Person width={28} height={28} className="text-[#C9A227]" />
                </div>
              )}

              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Picture width={16} height={16} className="text-white" />
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </label>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  className="text-2xl text-white"
                  style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800 }}
                >
                  {name || "Unnamed reader"}
                </h2>

                <span
                  className="px-2.5 py-1 rounded-full border border-[#C9A227]/60 text-[#E8CD6C] text-[10px] tracking-[0.15em] uppercase"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {user.role || "reader"}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2 text-sm text-white/60">
                <At width={14} height={14} />
                {user.email}
              </div>
            </div>
          </div>

          <div
            className="flex sm:flex-col gap-6 sm:gap-2 sm:text-right text-white/70"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">Member ID</p>
              <p className="text-sm text-white">{memberId}</p>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">Joined</p>
              <p className="text-sm text-white flex items-center gap-1.5 sm:justify-end">
                <Calendar width={12} height={12} />
                {joined}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-6 pt-5 border-t border-white/10 flex items-center gap-2 text-xs text-white/50">
          <ShieldKeyhole width={14} height={14} />
          {user.emailVerified ? "Email verified" : "Email not verified"}
        </div>
      </div>

      {/* ===== Editable fields ===== */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">

        <div className="flex items-center gap-2 mb-5">
          <Person width={16} height={16} className="text-gray-400" />
          <h3
            className="text-sm tracking-[0.1em] uppercase text-gray-500"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Personal information
          </h3>
        </div>

        <div className="space-y-5">
          <TextField className="flex flex-col gap-2">
            <Label className="font-medium text-gray-700">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 px-4 border border-gray-200 rounded-xl focus:border-[#1C2036] transition-colors"
            />
          </TextField>

          <TextField isDisabled className="flex flex-col gap-2">
            <Label className="font-medium text-gray-700">Email</Label>
            <Input
              value={user.email}
              isDisabled
              className="h-12 px-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-400">Email can't be changed here.</p>
          </TextField>
        </div>

        <div className="flex items-center gap-2 mt-10 mb-1">
          <ShieldKeyhole width={16} height={16} className="text-gray-400" />
          <h3
            className="text-sm tracking-[0.1em] uppercase text-gray-500"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Change password
          </h3>
        </div>
        <p className="text-xs text-gray-400 mb-5">
          Leave these blank to keep your current password.
        </p>

        <div className="space-y-4">
          <TextField className="flex flex-col gap-2">
            <Label className="text-sm text-gray-700">Current password</Label>
            <Input
              type={isVisible ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="h-12 px-4 border border-gray-200 rounded-xl focus:border-[#1C2036] transition-colors"
            />
          </TextField>

          <div className="grid sm:grid-cols-2 gap-4">
            <TextField className="flex flex-col gap-2">
              <Label className="text-sm text-gray-700">New password</Label>
              <div className="relative">
                <Input
                  type={isVisible ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-12 px-4 pr-11 border border-gray-200 rounded-xl w-full focus:border-[#1C2036] transition-colors"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </TextField>

            <TextField className="flex flex-col gap-2">
              <Label className="text-sm text-gray-700">Confirm new password</Label>
              <Input
                type={isVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 px-4 border border-gray-200 rounded-xl focus:border-[#1C2036] transition-colors"
              />
            </TextField>
          </div>
        </div>

        {error && (
          <p className="mt-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        {success && (
          <p className="mt-6 text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
            {success}
          </p>
        )}

        <Button
          type="submit"
          isLoading={loading}
          className="mt-6 rounded-xl px-6 h-12 text-white font-semibold"
          style={{ background: "#1C2036" }}
        >
          Save changes
        </Button>
      </div>
    </form>
  );
}
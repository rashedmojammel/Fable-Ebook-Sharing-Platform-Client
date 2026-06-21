"use client";

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    Button,
} from "@heroui/react";

import {
    BookOpen,
    Picture,
    CircleDollar,
    Pencil,
    ArrowUpFromSquare,
} from "@gravity-ui/icons";

import { updatebook } from "@/lib/actions/books";
import { useRouter } from "next/navigation";

export default function EditEbookForm({ book }) {
    const router = useRouter();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [coverFile, setCoverFile] = useState(null);
    const [preview, setPreview] = useState(book.coverImage || null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const newErrors = {};

        if (!data.title) newErrors.title = "Title is required";
        if (!data.genre) newErrors.genre = "Genre is required";
        if (!data.price) newErrors.price = "Price is required";
        if (!data.description)
            newErrors.description = "Description is required";
        if (!preview)
            newErrors.coverImage = "Cover image is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            setErrors({});

            let imageUrl = book.coverImage;

            // Only re-upload if the writer picked a new cover
            if (coverFile) {
                const imageFormData = new FormData();
                imageFormData.append("image", coverFile);

                const uploadRes = await fetch(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                    {
                        method: "POST",
                        body: imageFormData,
                    }
                );

                const imageResult = await uploadRes.json();

                if (!imageResult.success) {
                    throw new Error("Image upload failed");
                }

                imageUrl = imageResult.data.url;
            }

            const payload = {
                title: data.title,
                description: data.description,
                genre: data.genre,
                price: Number(data.price),
                coverImage: imageUrl,
            };

            const res = await updatebook(book._id, payload);

            if (res.acknowledged) {
                alert("Ebook updated successfully!");
                router.push("/dashboard/writer/manage-ebooks");
            } else {
                alert("Failed to update ebook");
            }
        } catch (error) {
            console.log(error);
            alert("Failed to update ebook");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 py-10 px-4 sm:px-6 lg:px-8">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-10 text-center">

                    <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
                        <Pencil size={14} />
                        Edit Ebook
                    </div>

                    <h1 className="mt-5 text-5xl font-black text-zinc-900">
                        Update Your Ebook
                    </h1>

                    <p className="mt-3 max-w-2xl mx-auto text-zinc-500">
                        Make changes to your published ebook. Updates go live
                        as soon as you save.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-10 shadow-xl">

                    <Form
                        onSubmit={handleSubmit}
                        validationErrors={errors}
                        validationBehavior="aria"
                        className="space-y-8"
                    >
                        <Fieldset className="space-y-8 w-full">

                            <legend className="w-full border-b border-zinc-200 pb-3 text-lg font-semibold text-zinc-800">
                                Ebook Information
                            </legend>

                            {/* Cover Upload */}
                            <div className="space-y-3">

                                <Label className="font-medium text-zinc-700">
                                    Cover Image
                                </Label>

                                <label
                                    className="
                                        relative
                                        flex
                                        h-72
                                        cursor-pointer
                                        flex-col
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        rounded-3xl
                                        border-2
                                        border-dashed
                                        border-violet-300
                                        bg-violet-50
                                        hover:bg-violet-100
                                        transition-all
                                    "
                                >

                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <Picture
                                                size={50}
                                                className="text-violet-500"
                                            />

                                            <p className="mt-4 text-lg font-semibold text-zinc-800">
                                                Upload Ebook Cover
                                            </p>

                                            <p className="text-sm text-zinc-500">
                                                PNG, JPG, JPEG supported
                                            </p>
                                        </>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];

                                            setCoverFile(file);

                                            if (file) {
                                                setPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                </label>

                                {preview && (
                                    <p className="text-xs text-zinc-500">
                                        Click the image to replace it. Leave it as is to keep
                                        the current cover.
                                    </p>
                                )}

                                {errors.coverImage && (
                                    <FieldError className="text-danger text-xs">
                                        {errors.coverImage}
                                    </FieldError>
                                )}
                            </div>

                            {/* Title */}
                            <TextField
                                name="title"
                                defaultValue={book.title}
                                isInvalid={!!errors.title}
                                className="flex flex-col gap-2"
                            >
                                <Label className="font-medium text-zinc-700">
                                    Ebook Title
                                </Label>

                                <div className="relative">

                                    <BookOpen
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                                    />

                                    <Input
                                        placeholder="The Art of Next.js"
                                        className="pl-11 bg-zinc-50 border border-zinc-200 rounded-xl h-12"
                                    />
                                </div>

                                {errors.title && (
                                    <FieldError>{errors.title}</FieldError>
                                )}
                            </TextField>

                            {/* Genre + Price */}
                            <div className="grid md:grid-cols-2 gap-6">

                                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5">

                                    <Label className="font-medium text-zinc-700 mb-2 block">
                                        Genre
                                    </Label>

                                    <Select name="genre" defaultSelectedKey={book.genre}>

                                        <Select.Trigger className="w-full border border-zinc-200 bg-white rounded-xl h-12 px-4">
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>

                                        <Select.Popover>
                                            <ListBox>
                                                <ListBox.Item id="Fiction">Fiction</ListBox.Item>
                                                <ListBox.Item id="Mystery">Mystery</ListBox.Item>
                                                <ListBox.Item id="Fantasy">Fantasy</ListBox.Item>
                                                <ListBox.Item id="Romance">Romance</ListBox.Item>
                                                <ListBox.Item id="Sci-Fi">Sci-Fi</ListBox.Item>
                                                <ListBox.Item id="Educational">Educational</ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>

                                    </Select>

                                </div>

                                <TextField
                                    name="price"
                                    defaultValue={String(book.price)}
                                    className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5"
                                >
                                    <Label className="font-medium text-zinc-700 mb-2 block">
                                        Price ($)
                                    </Label>

                                    <div className="relative">

                                        <CircleDollar
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                                        />

                                        <Input
                                            type="number"
                                            placeholder="9.99"
                                            className="pl-11 bg-white border border-zinc-200 rounded-xl h-12"
                                        />
                                    </div>

                                </TextField>

                            </div>

                            {/* Description */}
                            <TextField
                                name="description"
                                defaultValue={book.description}
                                isInvalid={!!errors.description}
                                className="flex flex-col gap-2"
                            >
                                <Label className="font-medium text-zinc-700">
                                    Full Content / Description
                                </Label>

                                <div className="relative">

                                    <Pencil
                                        size={18}
                                        className="absolute left-4 top-5 text-zinc-400"
                                    />

                                    <TextArea
                                        rows={12}
                                        placeholder="Write a detailed description of your ebook..."
                                        className="
                                            pl-12
                                            bg-zinc-50
                                            border
                                            border-zinc-200
                                            rounded-2xl
                                            min-h-[250px]
                                        "
                                    />
                                </div>

                                {errors.description && (
                                    <FieldError>{errors.description}</FieldError>
                                )}
                            </TextField>

                        </Fieldset>

                        {/* Footer */}
                        <div className="flex items-center justify-between border-t border-zinc-200 pt-6 mt-8 w-full">

                            <p className="text-sm text-zinc-500">
                                Changes are visible to readers immediately.
                            </p>

                            <Button
                                type="submit"
                                isLoading={loading}
                                className="
                                    bg-gradient-to-r
                                    from-violet-600
                                    to-fuchsia-600
                                    text-white
                                    rounded-xl
                                    px-8
                                    h-12
                                    font-semibold
                                    shadow-lg
                                "
                            >
                                <ArrowUpFromSquare size={16} />
                                Save Changes
                            </Button>

                        </div>

                    </Form>
                </div>

            </div>
        </div>
    );
}
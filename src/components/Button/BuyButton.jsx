"use client";

import { Button } from "@heroui/react";

export default function BuyButton({ bookId, price }) {
  const handleBuy = async () => {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <Button
      fullWidth
      color="primary"
      size="lg"
      onClick={handleBuy}
    >
      Buy Now — ${price}
    </Button>
  );
}
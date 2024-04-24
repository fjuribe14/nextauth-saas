import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartBbutton() {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
      </Link>
    </Button>
  );
}

"use client";

import { useEffect } from "react";

export function HakusanInteractions() {
  useEffect(() => {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");

    const toggleNav = () => nav?.classList.toggle("open");
    const closeNav = () => nav?.classList.remove("open");

    burger?.addEventListener("click", toggleNav);

    const navLinks = nav ? Array.from(nav.querySelectorAll("a")) : [];
    navLinks.forEach((link) => link.addEventListener("click", closeNav));

    const cleanupFaq = Array.from(document.querySelectorAll<HTMLElement>(".faq-item .faq-q")).map((button) => {
      const toggleFaq = () => button.parentElement?.classList.toggle("open");
      button.addEventListener("click", toggleFaq);

      return () => button.removeEventListener("click", toggleFaq);
    });

    return () => {
      burger?.removeEventListener("click", toggleNav);
      navLinks.forEach((link) => link.removeEventListener("click", closeNav));
      cleanupFaq.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}

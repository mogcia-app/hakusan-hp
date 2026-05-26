import { HakusanInteractions } from "@/components/HakusanInteractions";
import { HomeBookingWidget } from "@/components/HomeBookingWidget";
import { hakusanSectionOverride, hakusanSharedOverride } from "@/lib/hakusan-overrides";
import { bookingWidgetMarker, getHakusanPageContent } from "@/lib/hakusan-page";

export default function Page() {
  const { bodyHtml, styleText } = getHakusanPageContent();
  const [beforeBooking, afterBooking = ""] = bodyHtml.split(bookingWidgetMarker);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleText }} />
      <style dangerouslySetInnerHTML={{ __html: hakusanSharedOverride }} />
      <style dangerouslySetInnerHTML={{ __html: hakusanSectionOverride }} />
      <div dangerouslySetInnerHTML={{ __html: beforeBooking }} />
      <HomeBookingWidget />
      <div dangerouslySetInnerHTML={{ __html: afterBooking }} />
      <HakusanInteractions />
    </>
  );
}

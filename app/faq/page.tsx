import { HakusanInteractions } from "@/components/HakusanInteractions";
import { hakusanSectionOverride, hakusanSharedOverride } from "@/lib/hakusan-overrides";
import { getHakusanChrome, getHakusanFaqPageContent } from "@/lib/hakusan-page";

export default function FaqPage() {
  const { bodyHtml, styleText } = getHakusanFaqPageContent();
  const { headerHtml, footerHtml } = getHakusanChrome();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleText }} />
      <style dangerouslySetInnerHTML={{ __html: hakusanSharedOverride }} />
      <style dangerouslySetInnerHTML={{ __html: hakusanSectionOverride }} />
      <div dangerouslySetInnerHTML={{ __html: headerHtml }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
      <HakusanInteractions />
    </>
  );
}

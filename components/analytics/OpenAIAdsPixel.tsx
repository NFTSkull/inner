import { OPENAI_ADS_PIXEL_ID } from "@/lib/openai-ads";

/**
 * Bootstrap inline del Measurement Pixel.
 * Se renderiza dentro de <head> desde app/layout.tsx para inicializarlo
 * temprano sin depender de next/script.
 */
export function OpenAIAdsPixel() {
  const debug = process.env.NODE_ENV !== "production";
  const init =
    '!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");' +
    'oaiq("init",{pixelId:"' +
    OPENAI_ADS_PIXEL_ID +
    '",debug:' +
    String(debug) +
    "});";

  return <script id="openai-ads-pixel" dangerouslySetInnerHTML={{ __html: init }} />;
}

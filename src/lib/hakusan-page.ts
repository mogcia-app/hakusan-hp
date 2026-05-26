import fs from "fs";
import path from "path";

const extractedHtmlPath = path.join(
  process.cwd(),
  "public",
  "hakusan-import",
  "hakusan.extracted.html",
);

type HakusanPageContent = {
  bodyHtml: string;
  styleText: string;
};

type HakusanChrome = {
  headerHtml: string;
  footerHtml: string;
  styleText: string;
};

type HakusanRoomsPageContent = {
  bodyHtml: string;
  styleText: string;
};

export const bookingWidgetMarker = "<!-- HAKUSAN_BOOKING_WIDGET -->";

function matchOrThrow(source: string, pattern: RegExp, label: string) {
  const match = source.match(pattern);

  if (!match?.[1]) {
    throw new Error(`Unable to extract ${label} from ${extractedHtmlPath}`);
  }

  return match[1];
}

function stripInlineScript(source: string) {
  return source.replace(/<script[\s\S]*?<\/script>\s*$/i, "").trim();
}

function rewriteHeaderNav(source: string) {
  return source.replace(
    /<nav class="nav" id="nav">[\s\S]*?<\/nav>/i,
    `<nav class="nav" id="nav">
      <a href="#concept">総合案内</a>
      <a href="/rooms">客室案内</a>
      <a href="#access">交通アクセス</a>
      <a href="#faq">よくある質問</a>
      <a class="cta-reserve" href="#reserve">ご予約 <span class="arr">→</span></a>
    </nav>`,
  );
}

function rewriteConceptSignature(source: string) {
  return source.replace("— 島原白山ホテル 支配人 —", "— 島原白山ホテル —");
}

function rewriteHeroCopy(source: string) {
  return source
    .replace("静かなおもてなしを。", "静かなおもてなしを")
    .replace("島原港から車で2分。", "島原港から車で2分")
    .replace("朝食と駐車場は無料。", "朝食と駐車場は無料")
    .replace("旅にも寄り添う宿。", "旅にも寄り添う宿");
}

function rewriteLongStayParagraph(source: string) {
  return source
    .replace("連泊・長期滞在のお客様には、", "")
    .replace("、各種ビジネスサポート", "");
}

function rewriteConceptParagraphCopy(source: string) {
  return source.replace(
    "コインランドリーや会議室をご利用いただけます。観光のお客様には、島原城・島原温泉・雲仙へのアクセスの良さで、滞在の自由度を最大限に。",
    "コインランドリーや会議室もご利用いただけます。<br>島原城・島原温泉・雲仙へのアクセスの良さで、滞在の自由度を最大限に。",
  );
}

function rewriteConceptImage(source: string) {
  return source.replace(
    '<div class="ph" data-label="image · lobby or interior 4:5"></div>',
    '<img src="/hakusan-import/assets/image/hakusan-1.png" alt="島原白山ホテル 館内イメージ">',
  );
}

function rewriteStrengths(source: string) {
  return source.replace(
    /<section class="strengths">[\s\S]*?<\/section>/i,
    `<section class="strengths">
  <div class="strengths-inner">
    <div class="strength">
      <div class="strength-num">01</div>
      <div>
        <h3>無料駐車場完備</h3>
        <p>約50台分の駐車スペースをご用意。<br>大型車でお越しの際は、事前にご相談ください。</p>
      </div>
    </div>
    <div class="strength">
      <div class="strength-num">02</div>
      <div>
        <h3>全室インターネット接続対応</h3>
        <p>全客室で、有線LAN・無線LANをご利用いただけます。<br>ご滞在中も快適にお過ごしいただけます。</p>
      </div>
    </div>
    <div class="strength">
      <div class="strength-num">03</div>
      <div>
        <h3>余裕のチェックアウト11:00</h3>
        <p>朝の時間にもゆとりを。<br>ご出発まで、落ち着いてお過ごしいただけます。</p>
      </div>
    </div>
  </div>
</section>`,
  );
}

function rewritePlansSection(source: string) {
  return source.replace(
    /<section class="block plans" id="plans">[\s\S]*?<\/section>/i,
    `<section class="block plans" id="plans">
  <div class="section-inner">
    <div class="plan-list">
      <article class="plan-block">
        <div class="plan-overview">
          <div class="plan-kicker">Breakfast Included</div>
          <h3>【朝食付】シングルプラン</h3>
          <p class="plan-period">2023年05月01日(月)から2026年07月31日(金)</p>
          <div class="plan-copy">
            <p>2Fフロント横レストランにて、7:00 - 8:30の朝食をご用意しております。和食でのご提供、ドリンクはセルフサービスです。</p>
            <p>駐車場は3か所・計50台。大型車でお越しの際も、事前にご相談ください。</p>
            <p>館内には洗濯機・乾燥機・電子レンジ・自動販売機を備え、長期滞在にも対応しております。</p>
          </div>
        </div>
        <div class="plan-rooms">
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single a smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルA】 ～喫煙ルーム～</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食あり / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 5,930円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single a non-smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルA】 ～禁煙ルーム～</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食あり / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 5,930円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single b smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルB】 ～喫煙ルーム～</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食あり / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 6,210円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single b non-smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルB】 ～禁煙ルーム～</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食あり / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 6,210円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single c smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルC】 ～喫煙ルーム～</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食あり / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 6,400円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single c non-smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルC】 ～禁煙ルーム～</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食あり / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 6,400円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
        </div>
      </article>

      <article class="plan-block">
        <div class="plan-overview">
          <div class="plan-kicker">Compact Single</div>
          <h3>【朝食付】シングルSプラン</h3>
          <p class="plan-period">2026年04月01日(水)から2026年07月31日(金)</p>
          <div class="plan-copy">
            <p>朝食・無料駐車場・館内設備のご案内はシングルプランと同様です。現地決済のお客様向けに、自社ポイントカード特典もご利用いただけます。</p>
          </div>
        </div>
        <div class="plan-rooms">
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single s smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルS】喫煙ルーム</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食あり / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 5,360円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single s non-smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルS】～禁煙～</h4>
              <p class="plan-room-note">約13平米 / セミダブルベッド（幅120cm） / バス・シャワートイレ・冷蔵庫付 / Wi-Fi・有線LAN対応</p>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食あり / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 5,360円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
        </div>
      </article>

      <article class="plan-block">
        <div class="plan-overview">
          <div class="plan-kicker">Twin Stay</div>
          <h3>～旅行にもおすすめ！ツインプラン～《素泊まり》</h3>
          <p class="plan-period">2017年05月20日(土)から2026年07月31日(金)</p>
          <div class="plan-copy">
            <p>有線・無線LAN接続無料。駐車場無料。朝食はチェックイン時のお申し出で追加も可能です。</p>
            <p>ベッドはセミダブル1台・ダブル1台。ご家族やご友人同士で、ゆったりとお過ごしいただけます。</p>
          </div>
        </div>
        <div class="plan-rooms">
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · twin a"></div>
            <div class="plan-room-body">
              <h4>【ツインA】喫煙ルーム</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食なし / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>2名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>10,450円 / 室</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · twin b"></div>
            <div class="plan-room-body">
              <h4>【ツインB】喫煙ルーム</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食なし / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>2名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>12,350円 / 室</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
        </div>
      </article>

      <article class="plan-block">
        <div class="plan-overview">
          <div class="plan-kicker">Triple Stay</div>
          <h3>～旅行にもおすすめ！トリプルプラン～《素泊まり》</h3>
          <p class="plan-period">2017年05月20日(土)から2026年07月31日(金)</p>
          <div class="plan-copy">
            <p>約36平米の最上階角部屋。セミダブル2台とダブル1台を備え、グループやご家族でゆっくりとお過ごしいただけます。</p>
            <p>大きな窓からは島原の町並みが一望でき、観光や里帰りのご滞在にもおすすめです。</p>
          </div>
        </div>
        <div class="plan-rooms">
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · triple room"></div>
            <div class="plan-room-body">
              <h4>【トリプル】喫煙ルーム</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食なし / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>3名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>15,200円 / 室</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
        </div>
      </article>

      <article class="plan-block">
        <div class="plan-overview">
          <div class="plan-kicker">Room Only</div>
          <h3>～シングルプラン～《素泊まり》</h3>
          <p class="plan-period">2014年04月01日(火)から2026年07月31日(金)</p>
          <div class="plan-copy">
            <p>ご出張やご旅行に、ゆったりとしたセミダブルベッドをご用意。駐車場利用は無料です。</p>
            <p>朝食はチェックイン時のお申し出で追加可能。島原船津駅から徒歩約3分、湊広馬場バス停から徒歩1分の立地です。</p>
          </div>
        </div>
        <div class="plan-rooms">
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single a room only smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルA】 ～喫煙ルーム～</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食なし / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 5,230円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single a room only non-smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルA】 ～禁煙ルーム～</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食なし / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 5,230円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single b room only smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルB】 ～喫煙ルーム～</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食なし / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 5,510円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single b room only non-smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルB】 ～禁煙ルーム～</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食なし / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 5,510円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single c room only smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルC】 ～喫煙ルーム～</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食なし / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 5,700円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single c room only non-smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルC】 ～禁煙ルーム～</h4>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食なし / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 5,700円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single s room only non-smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルS】～禁煙～</h4>
              <p class="plan-room-note">約13平米、窓側に柱あり。セミダブルベッド（幅120cm）を備えた、コンパクトな客室です。</p>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食なし / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 4,660円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
          <article class="plan-room">
            <div class="plan-thumb ph" data-label="image placeholder · single s room only smoking"></div>
            <div class="plan-room-body">
              <h4>【シングルS】喫煙ルーム</h4>
              <p class="plan-room-note">約13平米、窓側に柱あり。セミダブルベッド（幅120cm）を備えた、コンパクトな客室です。</p>
              <dl class="plan-specs">
                <div><dt>食事</dt><dd>朝食なし / 夕食なし</dd></div>
                <div><dt>人数</dt><dd>1名</dd></div>
                <div><dt>決済</dt><dd>現地決済</dd></div>
              </dl>
              <div class="plan-price-row">
                <strong>1名利用時 4,660円 / 人</strong>
                <a class="linkmore" href="/reserve/results">空室を見る</a>
              </div>
            </div>
          </article>
        </div>
      </article>
    </div>
  </div>
</section>`,
  );
}

function replaceBookingWidget(source: string) {
  return source.replace(
    /<!-- ============================================================\s+BOOKING WIDGET[\s\S]*?<\/div>\s*<\/div>/i,
    bookingWidgetMarker,
  );
}

function removePlansSection(source: string) {
  return source.replace(/<section class="block plans" id="plans">[\s\S]*?<\/section>/i, "");
}

function rewriteChromeLinksForSubpage(source: string) {
  return source
    .replaceAll('href="#concept"', 'href="/#concept"')
    .replaceAll('href="#rooms"', 'href="/rooms"')
    .replaceAll('href="#plans"', 'href="/rooms#plans"')
    .replaceAll('href="#features"', 'href="/#features"')
    .replaceAll('href="#access"', 'href="/#access"')
    .replaceAll('href="#sights"', 'href="/#sights"')
    .replaceAll('href="#faq"', 'href="/#faq"')
    .replaceAll('href="#news"', 'href="/#news"')
    .replaceAll('href="#reserve"', 'href="/#reserve"')
    .replaceAll('href="#"', 'href="/"');
}

function getStyleText(html: string) {
  return [...html.matchAll(/<style>([\s\S]*?)<\/style>/gi)].map((match) => match[1]).join("\n");
}

function getBodyHtml(html: string) {
  return matchOrThrow(html, /<body>([\s\S]*?)<\/body>/i, "body");
}

function getHeaderHtml(source: string) {
  return matchOrThrow(source, /(<header class="header">[\s\S]*?<\/header>)/i, "header");
}

function getFooterHtml(source: string) {
  return matchOrThrow(
    source,
    /(<footer class="footer">[\s\S]*?<\/footer>[\s\S]*?<div class="fab">[\s\S]*?<\/div>)/i,
    "footer",
  );
}

function getSectionHtml(source: string, sectionId: string) {
  return matchOrThrow(
    source,
    new RegExp(`(<section class="block [^"]*" id="${sectionId}">[\\s\\S]*?<\\/section>)`, "i"),
    sectionId,
  );
}

function getTransformedBodyHtml() {
  const html = fs.readFileSync(extractedHtmlPath, "utf8");
  const bodyHtml = getBodyHtml(html);

  return rewritePlansSection(
    rewriteStrengths(
      rewriteConceptParagraphCopy(
        rewriteLongStayParagraph(
          rewriteConceptSignature(
            rewriteConceptImage(rewriteHeroCopy(rewriteHeaderNav(stripInlineScript(bodyHtml)))),
          ),
        ),
      ),
    ),
  );
}

export function getHakusanPageContent(): HakusanPageContent {
  const html = fs.readFileSync(extractedHtmlPath, "utf8");
  const styleText = getStyleText(html);
  const bodyHtml = getTransformedBodyHtml();

  return {
    bodyHtml: replaceBookingWidget(
      removePlansSection(bodyHtml),
    ),
    styleText,
  };
}

export function getHakusanRoomsPageContent(): HakusanRoomsPageContent {
  const html = fs.readFileSync(extractedHtmlPath, "utf8");
  const styleText = getStyleText(html);
  const bodyHtml = getTransformedBodyHtml();
  const plansSection = getSectionHtml(bodyHtml, "plans");

  return {
    bodyHtml: `
      <section class="page-intro">
        <div class="page-intro-inner">
          <div class="en">Stay Plans</div>
          <h1>宿泊プラン一覧</h1>
          <p>ご滞在の目的やご利用人数にあわせてお選びいただける宿泊プランをご案内しています。ご希望のお部屋が見つかりましたら、そのまま空室確認へお進みいただけます。</p>
        </div>
      </section>
      ${plansSection}
    `,
    styleText,
  };
}

export function getHakusanChrome(): HakusanChrome {
  const html = fs.readFileSync(extractedHtmlPath, "utf8");
  const styleText = getStyleText(html);
  const bodyHtml = rewriteHeaderNav(getBodyHtml(html));

  return {
    headerHtml: rewriteChromeLinksForSubpage(getHeaderHtml(bodyHtml)),
    footerHtml: rewriteChromeLinksForSubpage(getFooterHtml(bodyHtml)),
    styleText,
  };
}

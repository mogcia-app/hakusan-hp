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

type HakusanGuidePageContent = {
  bodyHtml: string;
  styleText: string;
};

type HakusanFaqPageContent = {
  bodyHtml: string;
  styleText: string;
};

type HakusanAccessPageContent = {
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
      <a href="/guide">総合案内</a>
      <a href="/rooms">客室案内</a>
      <a href="/access">交通アクセス</a>
      <a href="/faq">よくある質問</a>
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
    "フロント案内や会議室もご利用いただけます。<br>島原城・島原温泉・雲仙へのアクセスの良さで、滞在の自由度を最大限に。",
  );
}

function rewriteConceptImage(source: string) {
  return source.replace(
    '<div class="ph" data-label="image · lobby or interior 4:5"></div>',
    '<img src="/hakusan-import/assets/image/hakusan-1.png" alt="島原白山ホテル 館内イメージ">',
  );
}

function rewriteHeaderLogo(source: string) {
  return source.replace(
    '/hakusan-import/assets/48113283-549f-4326-9868-d8c44ef27a6e.png',
    '/hakusan-import/assets/8e10bf65-4c59-4d64-8e9b-7732edd6c5a2.png',
  );
}

function rewriteFeatureImages(source: string) {
  return source
    .replace(
      '<div class="feature-img ph" data-label="image · breakfast 16:10"></div>',
      '<div class="feature-img"><img src="/hakusan-import/assets/image/washoku.png" alt="心づくしの和朝食" style="width:100%;height:100%;object-fit:cover"></div>',
    )
    .replace(
      '<div class="feature-img ph" data-label="image · parking"></div>',
      '<div class="feature-img"><img src="/hakusan-import/assets/image/ti.png" alt="50台駐車場・無料" style="width:100%;height:100%;object-fit:cover"></div>',
    )
    .replace(
      '<div class="feature-img ph" data-label="image · meeting room"></div>',
      '<div class="feature-img"><img src="/hakusan-import/assets/image/kaigi.png" alt="会議室" style="width:100%;height:100%;object-fit:cover"></div>',
    )
    .replace(
      '<div class="feature-img ph" data-label="image · front desk"></div>',
      '<div class="feature-img"><img src="/hakusan-import/assets/image/flont.png" alt="フロント案内" style="width:100%;height:100%;object-fit:cover"></div>',
    )
    .replace(
      '<div class="feature-img ph" data-label="image · in-room amenities"></div>',
      '<div class="feature-img"><img src="/hakusan-import/assets/image/4.png" alt="客室設備" style="width:100%;height:100%;object-fit:cover"></div>',
    );
}

function rewritePlanRoomImages(source: string) {
  return source
    .replaceAll(
      '<div class="plan-thumb ph" data-label="image placeholder · single a smoking"></div>',
      '<div class="plan-thumb"><img src="/hakusan-import/assets/image/sa.png" alt="シングルA" style="width:100%;height:100%;object-fit:cover"></div>',
    )
    .replaceAll(
      '<div class="plan-thumb ph" data-label="image placeholder · single a non-smoking"></div>',
      '<div class="plan-thumb"><img src="/hakusan-import/assets/image/sa.png" alt="シングルA" style="width:100%;height:100%;object-fit:cover"></div>',
    )
    .replaceAll(
      '<div class="plan-thumb ph" data-label="image placeholder · single a room only smoking"></div>',
      '<div class="plan-thumb"><img src="/hakusan-import/assets/image/sa.png" alt="シングルA" style="width:100%;height:100%;object-fit:cover"></div>',
    )
    .replaceAll(
      '<div class="plan-thumb ph" data-label="image placeholder · single a room only non-smoking"></div>',
      '<div class="plan-thumb"><img src="/hakusan-import/assets/image/sa.png" alt="シングルA" style="width:100%;height:100%;object-fit:cover"></div>',
    )
    .replaceAll(
      '<div class="plan-thumb ph" data-label="image placeholder · single b smoking"></div>',
      '<div class="plan-thumb"><img src="/hakusan-import/assets/image/sb.png" alt="シングルB" style="width:100%;height:100%;object-fit:cover"></div>',
    )
    .replaceAll(
      '<div class="plan-thumb ph" data-label="image placeholder · single b non-smoking"></div>',
      '<div class="plan-thumb"><img src="/hakusan-import/assets/image/sb.png" alt="シングルB" style="width:100%;height:100%;object-fit:cover"></div>',
    )
    .replaceAll(
      '<div class="plan-thumb ph" data-label="image placeholder · single b room only smoking"></div>',
      '<div class="plan-thumb"><img src="/hakusan-import/assets/image/sb.png" alt="シングルB" style="width:100%;height:100%;object-fit:cover"></div>',
    )
    .replaceAll(
      '<div class="plan-thumb ph" data-label="image placeholder · single b room only non-smoking"></div>',
      '<div class="plan-thumb"><img src="/hakusan-import/assets/image/sb.png" alt="シングルB" style="width:100%;height:100%;object-fit:cover"></div>',
    )
    .replaceAll(
      '<div class="plan-thumb ph" data-label="image placeholder · twin b"></div>',
      '<div class="plan-thumb"><img src="/hakusan-import/assets/image/tb.png" alt="ツインB" style="width:100%;height:100%;object-fit:cover"></div>',
    )
    .replaceAll(
      '<div class="plan-thumb ph" data-label="image placeholder · triple room"></div>',
      '<div class="plan-thumb"><img src="/hakusan-import/assets/image/4.png" alt="トリプル" style="width:100%;height:100%;object-fit:cover"></div>',
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

function rewriteRoomsSection(source: string) {
  return source.replace(
    /<section class="block rooms" id="rooms">[\s\S]*?<\/section>/i,
    `<section class="block rooms" id="rooms">
  <div class="section-inner">
    <div class="section-head">
      <div class="section-title">
        <div class="en">Rooms</div>
        <h2>客室のご案内</h2>
      </div>
    </div>
    <div class="rooms-grid">

      <article class="room">
        <div class="room-img"><img src="/hakusan-import/assets/image/sa.png" alt="シングルA" style="width:100%;height:100%;object-fit:cover"></div>
        <div class="room-body">
          <div class="room-tag">Type 01</div>
          <h3>シングルA</h3>
          <div class="room-meta">
            <span>朝食付き</span><span>1名様</span><span>喫煙・禁煙</span>
          </div>
          <p class="room-desc">定番の朝食付きシングルAタイプ。出張にも使いやすい、落ち着いた1名様向けの客室です。</p>
          <div class="room-price">
            <span class="lab">FROM</span>
            <span class="val">5,930</span>
            <span class="yen">円〜 / 1名利用</span>
          </div>
          <a class="linkmore" href="/rooms">客室詳細を見る</a>
        </div>
      </article>

      <article class="room">
        <div class="room-img"><img src="/hakusan-import/assets/image/sb.png" alt="シングルB" style="width:100%;height:100%;object-fit:cover"></div>
        <div class="room-body">
          <div class="room-tag">Type 02</div>
          <h3>シングルB</h3>
          <div class="room-meta">
            <span>朝食付き</span><span>1名様</span><span>喫煙・禁煙</span>
          </div>
          <p class="room-desc">シングルAより少しゆとりのある朝食付きシングルBタイプ。島原でのご滞在を静かに支える一室です。</p>
          <div class="room-price">
            <span class="lab">FROM</span>
            <span class="val">6,210</span>
            <span class="yen">円〜 / 1名利用</span>
          </div>
          <a class="linkmore" href="/rooms">客室詳細を見る</a>
        </div>
      </article>

      <article class="room">
        <div class="room-img"><img src="/hakusan-import/assets/image/tb.png" alt="ツインB" style="width:100%;height:100%;object-fit:cover"></div>
        <div class="room-body">
          <div class="room-tag">Type 03</div>
          <h3>ツインB</h3>
          <div class="room-meta">
            <span>素泊まり</span><span>2名様</span><span>喫煙ルーム</span>
          </div>
          <p class="room-desc">よりゆとりのあるツインBタイプ。ご夫婦やご友人同士で、落ち着いてお過ごしいただける客室です。</p>
          <div class="room-price">
            <span class="lab">FROM</span>
            <span class="val">12,350</span>
            <span class="yen">円〜 / 1室</span>
          </div>
          <a class="linkmore" href="/rooms">客室詳細を見る</a>
        </div>
      </article>

      <article class="room">
        <div class="room-img"><img src="/hakusan-import/assets/image/4.png" alt="トリプル" style="width:100%;height:100%;object-fit:cover"></div>
        <div class="room-body">
          <div class="room-tag">Type 04</div>
          <h3>トリプル</h3>
          <div class="room-meta">
            <span>素泊まり</span><span>3名様</span><span>最上階角部屋</span>
          </div>
          <p class="room-desc">約36平米の最上階角部屋で、グループやご家族でゆったりお過ごしいただけるトリプルタイプです。</p>
          <div class="room-price">
            <span class="lab">FROM</span>
            <span class="val">15,200</span>
            <span class="yen">円〜 / 1室</span>
          </div>
          <a class="linkmore" href="/rooms">客室詳細を見る</a>
        </div>
      </article>

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

function removeFaqSection(source: string) {
  return source.replace(/<section class="block faq" id="faq">[\s\S]*?<\/section>/i, "");
}

function moveAccessSectionBelowSights(source: string) {
  const accessSection = getSectionHtml(source, "access");
  const sightsSection = getSectionHtml(source, "sights");

  return source
    .replace(accessSection, "")
    .replace(sightsSection, `${sightsSection}\n${accessSection}`);
}

function moveNewsSectionAboveFeatures(source: string) {
  const newsSection = getSectionHtml(source, "news");
  const featuresSection = getSectionHtml(source, "features");

  return source
    .replace(newsSection, "")
    .replace(featuresSection, `${newsSection}\n${featuresSection}`);
}

function rewriteReserveCtaLink(source: string) {
  return source.replace(
    '<a class="cta-block primary" href="#">',
    '<a class="cta-block primary" href="/reserve/results">',
  );
}

function rewriteChromeLinksForSubpage(source: string) {
  return source
    .replaceAll('href="#concept"', 'href="/#concept"')
    .replaceAll('href="#rooms"', 'href="/rooms"')
    .replaceAll('href="#plans"', 'href="/rooms#plans"')
    .replaceAll('href="#features"', 'href="/#features"')
    .replaceAll('href="#access"', 'href="/access"')
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

  return rewriteReserveCtaLink(
    rewritePlanRoomImages(
      moveNewsSectionAboveFeatures(
        moveAccessSectionBelowSights(
          rewritePlansSection(
            rewriteRoomsSection(
              rewriteStrengths(
                rewriteConceptParagraphCopy(
                  rewriteLongStayParagraph(
                    rewriteConceptSignature(
                      rewriteFeatureImages(
                        rewriteConceptImage(rewriteHeroCopy(rewriteHeaderLogo(rewriteHeaderNav(stripInlineScript(bodyHtml))))),
                      ),
                    ),
                  ),
                ),
              ),
            ),
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
    bodyHtml: replaceBookingWidget(removeFaqSection(removePlansSection(bodyHtml))),
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

export function getHakusanGuidePageContent(): HakusanGuidePageContent {
  const html = fs.readFileSync(extractedHtmlPath, "utf8");
  const styleText = getStyleText(html);

  return {
    bodyHtml: `
      <section class="guide-page">
        <div class="guide-inner">
          <header class="guide-header">
            <div class="en">Guide</div>
            <h1>総合案内</h1>
            <p>ご宿泊前にご確認いただきたい基本情報をまとめています。</p>
          </header>

          <section class="guide-section">
            <div class="guide-section-head">
              <div class="en">Basic Information</div>
              <h2>基本情報</h2>
            </div>
            <dl class="guide-table">
              <div class="guide-row">
                <dt>チェックイン / チェックアウト</dt>
                <dd>15：00～ （最終チェックイン：25：00） / ～11：00</dd>
              </div>
              <div class="guide-row">
                <dt>チェックアウト後の延長料金</dt>
                <dd>11:00～13:00 1時間 1,080円 / 13:00～ 室料の100％</dd>
              </div>
              <div class="guide-row">
                <dt>クレジットカード</dt>
                <dd>VISA、JCB、American Express、Diner&apos;s Club、UC、DC、NICOS、Master Card、CF</dd>
              </div>
              <div class="guide-row">
                <dt>サービス</dt>
                <dd>マッサージ、コピーサービス、FAXサービス</dd>
              </div>
              <div class="guide-row">
                <dt>駐車場</dt>
                <dd>大駐車場50台収容（無料）</dd>
              </div>
            </dl>
          </section>

          <section class="guide-section">
            <div class="guide-section-head">
              <div class="en">Cancellation Policy</div>
              <h2>キャンセルポリシー</h2>
            </div>
            <div class="guide-block">
              <h3>個人（9名まで）</h3>
              <p>キャンセル料は以下の通り頂戴いたします。</p>
              <ul class="guide-list">
                <li>不泊：宿泊料の100％</li>
                <li>当日(午後3時まで)：宿泊料金の0％</li>
                <li>当日(午後3時以降)：宿泊料金の100％</li>
              </ul>
            </div>
            <div class="guide-block">
              <h3>団体（10名以上）</h3>
              <p>キャンセル料は以下の通り頂戴いたします。</p>
              <ul class="guide-list">
                <li>不泊：宿泊料の100％</li>
                <li>当日：宿泊料金の100％</li>
                <li>前日：宿泊料金の50％</li>
                <li>2日～6日前：宿泊料金の30％</li>
              </ul>
            </div>
          </section>

          <section class="guide-section">
            <div class="guide-section-head">
              <div class="en">Terms</div>
              <h2>宿泊約款・利用規約</h2>
            </div>
            <p class="guide-note">ご予約の際には、必ず宿泊約款・利用規約をご確認ください。</p>
          </section>
        </div>
      </section>
    `,
    styleText,
  };
}

export function getHakusanFaqPageContent(): HakusanFaqPageContent {
  const html = fs.readFileSync(extractedHtmlPath, "utf8");
  const styleText = getStyleText(html);

  return {
    bodyHtml: `
      <section class="page-intro faq-intro">
        <div class="page-intro-inner">
          <div class="en">FAQ</div>
          <h1>よくあるご質問</h1>
          <p>ご宿泊やサービス、施設設備、アクセスに関するお問い合わせをまとめています。</p>
        </div>
      </section>

      <section class="faq-page">
        <div class="faq-page-inner">
          <section class="faq-page-group">
            <div class="faq-page-group-head">
              <div class="en">Stay</div>
              <h2>宿泊に関するご質問</h2>
            </div>

            <article class="faq-page-entry">
              <div class="faq-page-q">
                <span class="faq-page-mark">Q1</span>
                <div class="faq-page-text">幼児と一緒に利用したいのですが可能でしょうか？また料金を教えてください。</div>
              </div>
              <div class="faq-page-a">
                <span class="faq-page-mark">A1</span>
                <div class="faq-page-text">
                  <p>定員数を超えてご利用の場合、小学生のお子様から添寝料金1名1,800円を頂戴致しております。</p>
                  <p>未就学児の場合は料金対象外ですが、アメニティや朝食無料サービスも対象外でございます。</p>
                  <p>※年齢に限らずベッド1台につき添寝1名に限らせて頂きます。</p>
                  <p>※GW・お盆・年末年始期間は料金が異なります。</p>
                  <p>なお前日までにお知らせ下さいますようお願い致します。</p>
                </div>
              </div>
            </article>

            <article class="faq-page-entry">
              <div class="faq-page-q">
                <span class="faq-page-mark">Q2</span>
                <div class="faq-page-text">ダブルルームの予約方法がわかりません。</div>
              </div>
              <div class="faq-page-a">
                <span class="faq-page-mark">A2</span>
                <div class="faq-page-text">
                  <p>申し訳ございません。</p>
                  <p>ダブルのご予約につきましては、お電話で承っております。</p>
                </div>
              </div>
            </article>
          </section>

          <section class="faq-page-group">
            <div class="faq-page-group-head">
              <div class="en">Service</div>
              <h2>サービスに関するご質問</h2>
            </div>

            <article class="faq-page-entry">
              <div class="faq-page-q">
                <span class="faq-page-mark">Q1</span>
                <div class="faq-page-text">事前に荷物を送ることは可能ですか。</div>
              </div>
              <div class="faq-page-a">
                <span class="faq-page-mark">A1</span>
                <div class="faq-page-text">
                  <p>予めご連絡を頂けますと幸いです。</p>
                  <p>個口が多い、または極端に大きい荷物の場合は、保管の都合上ご遠慮願うことがございます。</p>
                </div>
              </div>
            </article>
          </section>

          <section class="faq-page-group">
            <div class="faq-page-group-head">
              <div class="en">Facilities</div>
              <h2>施設、設備に関するご質問</h2>
            </div>

            <article class="faq-page-entry">
              <div class="faq-page-q">
                <span class="faq-page-mark">Q1</span>
                <div class="faq-page-text">大浴場はありますか。</div>
              </div>
              <div class="faq-page-a">
                <span class="faq-page-mark">A1</span>
                <div class="faq-page-text">
                  <p>申し訳ありません。大浴場はございません。</p>
                </div>
              </div>
            </article>

            <article class="faq-page-entry">
              <div class="faq-page-q">
                <span class="faq-page-mark">Q2</span>
                <div class="faq-page-text">和室はありますか。</div>
              </div>
              <div class="faq-page-a">
                <span class="faq-page-mark">A2</span>
                <div class="faq-page-text">
                  <p>全室、洋室でございます。</p>
                </div>
              </div>
            </article>
          </section>

          <section class="faq-page-group">
            <div class="faq-page-group-head">
              <div class="en">Access</div>
              <h2>アクセス、周辺に関するご質問</h2>
            </div>

            <article class="faq-page-entry">
              <div class="faq-page-q">
                <span class="faq-page-mark">Q1</span>
                <div class="faq-page-text">駐車場を利用したいのですが。</div>
              </div>
              <div class="faq-page-a">
                <span class="faq-page-mark">A1</span>
                <div class="faq-page-text">
                  <p>駐車場は3ヵ所ございまして、十分な台数分のスペースがございます。先着順にご都合の良い所にお停め頂いております。</p>
                  <p>マイクロバス以上の大型車両でご来館の折には、予めご連絡を頂くことでスペースを確保することもございます。</p>
                </div>
              </div>
            </article>
          </section>

          <section class="faq-page-group">
            <div class="faq-page-group-head">
              <div class="en">Other</div>
              <h2>その他のご質問</h2>
            </div>

            <article class="faq-page-entry">
              <div class="faq-page-q">
                <span class="faq-page-mark">Q1</span>
                <div class="faq-page-text">予約確認のメールが届きません。</div>
              </div>
              <div class="faq-page-a">
                <span class="faq-page-mark">A1</span>
                <div class="faq-page-text">
                  <p>携帯電話キャリアメールアドレスをご登録の場合、</p>
                  <p>info@hotelhakusan.co.jpからのメールが届くようにご自身の携帯電話の設定をお願い致します。</p>
                </div>
              </div>
            </article>
          </section>
        </div>
      </section>
    `,
    styleText,
  };
}

export function getHakusanAccessPageContent(): HakusanAccessPageContent {
  const html = fs.readFileSync(extractedHtmlPath, "utf8");
  const styleText = getStyleText(html);
  const bodyHtml = getTransformedBodyHtml();
  const accessSection = getSectionHtml(bodyHtml, "access");

  return {
    bodyHtml: `
      <section class="page-intro">
        <div class="page-intro-inner">
          <div class="en">Access</div>
          <h1>交通アクセス</h1>
          <p>島原港や島原鉄道からのアクセス、所在地、周辺への移動目安をご案内しています。</p>
        </div>
      </section>
      ${accessSection}
    `,
    styleText,
  };
}

export function getHakusanChrome(): HakusanChrome {
  const html = fs.readFileSync(extractedHtmlPath, "utf8");
  const styleText = getStyleText(html);
  const bodyHtml = rewriteHeaderLogo(rewriteHeaderNav(getBodyHtml(html)));

  return {
    headerHtml: rewriteChromeLinksForSubpage(getHeaderHtml(bodyHtml)),
    footerHtml: rewriteChromeLinksForSubpage(getFooterHtml(bodyHtml)),
    styleText,
  };
}

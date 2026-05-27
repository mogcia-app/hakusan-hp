import Link from "next/link";
import { ReserveShell, reserveStyles as styles } from "@/components/reserve/ReserveShell";
import {
  formatCurrency,
  formatStayDate,
  getSearchFromParams,
  getNightCount,
  getRoomById,
  getRoomImageSrc,
} from "@/lib/reservation-demo";

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

function getParam(searchParams: PageProps["searchParams"], key: string) {
  const value = searchParams[key];
  return typeof value === "string" ? value : "";
}

function formatAcceptedAt() {
  const acceptedAt = new Date("2026-05-20T19:46:00+09:00");

  return acceptedAt.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo",
  });
}

export default function ReserveCompletePage({ searchParams }: PageProps) {
  const search = getSearchFromParams(searchParams);
  const room = getRoomById(getParam(searchParams, "roomType"));
  const roomImage = getRoomImageSrc(room.id);
  const nights = getNightCount(search.checkin, search.checkout);
  const estimatedPrice = room.priceFrom * nights * Number(search.rooms || "1");
  const fullName = getParam(searchParams, "fullName") || "ご予約者様";
  const reservationNumber = `HS-${search.checkin.replaceAll("-", "")}-${room.id.toUpperCase()}`;

  return (
    <ReserveShell
      title="ご予約が完了しました。"
      lead="ご予約内容を承りました。以下の内容をご確認のうえ、ご宿泊当日まで大切にお控えください。"
      search={search}
      titleClassName={styles.memberSignupTitle}
    >
      <section className={styles.section}>
        <div className={`${styles.card} ${styles.completeCard}`}>
          <p className={styles.demoTag}>Booking Confirmed</p>
          <h2 className={styles.completeTitle}>ご予約ありがとうございます。</h2>
          <p className={styles.priceCaption} style={{ marginTop: "16px" }}>
            {room.badge} / {room.meals}
          </p>
          <p className={styles.completeText}>
            {fullName} 様のご予約として、{room.name} / {formatStayDate(search.checkin)} チェックイン /
            {formatStayDate(search.checkout)} チェックアウトのお手続きが完了しました。
          </p>

          {roomImage ? (
            <div className={styles.formIntroVisual} style={{ marginTop: "24px" }}>
              <img src={roomImage} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ) : null}

          <div className={styles.confirmGrid}>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>予約番号</div>
              <div className={styles.confirmValue}>{reservationNumber}</div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>受付日時</div>
              <div className={styles.confirmValue}>{formatAcceptedAt()}</div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>お食事</div>
              <div className={styles.confirmValue}>{room.badge} / {room.meals}</div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>ご予約者名</div>
              <div className={styles.confirmValue}>{fullName} 様</div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>ご宿泊内容</div>
              <div className={styles.confirmValue}>
                {room.name} / {nights}泊 / {search.guests}名 / {search.rooms}室
              </div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>ご宿泊日</div>
              <div className={styles.confirmValue}>
                {formatStayDate(search.checkin)} - {formatStayDate(search.checkout)}
              </div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>お支払い方法</div>
              <div className={styles.confirmValue}>現地払い</div>
            </div>
            <div className={styles.confirmRow}>
              <div className={styles.confirmKey}>ご宿泊料金</div>
              <div className={styles.confirmValue}>
                {formatCurrency(estimatedPrice)}
                <span style={{ marginLeft: "10px", color: "#8c7561", fontSize: "13px" }}>
                  {nights}泊 / {search.rooms}室
                </span>
              </div>
            </div>
          </div>

          <div className={styles.noteBox}>
            <p>ご登録のメールアドレス宛に、ご予約確認のご案内をお送りします。</p>
            <p>チェックイン当日は、フロントにてご予約名をお申し付けください。</p>
          </div>

          <div className={styles.buttonRow} style={{ marginTop: "28px" }}>
            <Link href="/" className={styles.button}>
              トップへ戻る
            </Link>
            <Link href="/reserve/results" className={`${styles.button} ${styles.buttonSecondary}`}>
              別の日程で検索する
            </Link>
          </div>
        </div>
      </section>
    </ReserveShell>
  );
}

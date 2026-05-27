import Link from "next/link";
import { ReserveShell, reserveStyles as styles } from "@/components/reserve/ReserveShell";
import {
  buildReservationQuery,
  formatCurrency,
  getSearchFromParams,
  getNightCount,
  getRoomById,
  getRoomImageSrc,
} from "@/lib/reservation-demo";

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ReserveAuthPage({ searchParams }: PageProps) {
  const search = getSearchFromParams(searchParams);
  const roomType = typeof searchParams.roomType === "string" ? searchParams.roomType : undefined;
  const room = getRoomById(roomType);
  const roomImage = getRoomImageSrc(room.id);
  const nights = getNightCount(search.checkin, search.checkout);
  const estimatedPrice = room.priceFrom * nights * Number(search.rooms || "1");

  const baseParams = {
    ...search,
    roomType: room.id,
  };

  return (
    <ReserveShell
      title="予約方法をお選びください。"
      lead="会員登録して進む方法と、会員登録せずに進む方法のどちらでもご予約いただけます。ご希望の方法をお選びください。"
      search={search}
      titleClassName={styles.memberSignupTitle}
    >
      <section className={styles.section}>
        <div className={`${styles.card} ${styles.authHeroCard}`}>
          <div className={styles.authHeroGrid}>
            <div className={styles.authHeroContent}>
              <p className={styles.demoTag}>選択中の客室</p>
              <h2 className={styles.sectionTitle} style={{ marginTop: "14px" }}>
                {room.name}
              </h2>
              <p className={styles.sectionLead}>{room.summary}</p>
              <div className={styles.priceBlock}>
                <span className={styles.priceCaption}>Estimated stay price</span>
                <strong className={styles.priceMain}>{formatCurrency(estimatedPrice)}</strong>
                <span className={styles.priceSub}>
                  {nights}泊 / {search.rooms}室 の料金目安
                </span>
              </div>
            </div>
            <div className={styles.authHeroVisual}>
              {roomImage ? (
                <img src={roomImage} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div className="ph" data-label={`image placeholder · ${room.name}`}></div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.authGrid}>
        <article className={`${styles.card} ${styles.authCard}`}>
          <h2 className={styles.authTitle}>すでに会員の方</h2>
          <p className={styles.authText}>
            Eメールアドレスとパスワードを入力して、そのまま予約へお進みいただけます。
          </p>

          <form
            className={styles.form}
            action="/reserve/confirm"
          >
            {Object.entries(baseParams).map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}
            <input type="hidden" name="mode" value="member-login" />

            <label className={styles.field}>
              <span className={styles.label}>Eメールアドレス(ID)</span>
              <input className={styles.input} type="email" name="email" placeholder="example@hotel-demo.jp" />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>パスワード</span>
              <input className={styles.input} type="password" name="password" placeholder="パスワードを入力" />
            </label>

            <button type="submit" className={styles.button}>
              ログインして予約へ
            </button>
          </form>
        </article>

        <article className={`${styles.card} ${styles.authCard}`}>
          <h2 className={styles.authTitle}>まだ会員ではない方</h2>
          <p className={styles.authText}>
            会員登録して予約へ進む流れ、または会員登録せずに予約へ進む流れの両方をご案内できます。
          </p>
          <p className={styles.authNotice}>
            登録料・利用料・年会費はすべて無料です。会員登録をすると、次回以降のご予約がスムーズになります。
          </p>

          <div className={styles.buttonRow} style={{ marginTop: "22px" }}>
            <Link
              href={`/reserve/member-signup?${buildReservationQuery(baseParams)}`}
              className={styles.button}
            >
              会員登録して予約へ
            </Link>
            <Link
              href={`/reserve/guest?${buildReservationQuery(baseParams)}`}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              会員登録せず予約へ
            </Link>
          </div>
        </article>
      </section>
    </ReserveShell>
  );
}

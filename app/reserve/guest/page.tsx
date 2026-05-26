import { ReserveShell, reserveStyles as styles } from "@/components/reserve/ReserveShell";
import { formatCurrency, getNightCount, getRoomById, getSearchFromParams } from "@/lib/reservation-demo";

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function GuestReservationPage({ searchParams }: PageProps) {
  const search = getSearchFromParams(searchParams);
  const roomType = typeof searchParams.roomType === "string" ? searchParams.roomType : undefined;
  const room = getRoomById(roomType);
  const nights = getNightCount(search.checkin, search.checkout);
  const estimatedPrice = room.priceFrom * nights * Number(search.rooms || "1");

  return (
    <ReserveShell
      title="ご宿泊者情報を入力してください。"
      lead="会員登録をせずにご予約される方向けの入力画面です。必要事項をご入力のうえ、確認画面へお進みください。"
      search={search}
      titleClassName={styles.memberSignupTitle}
    >
      <section className={styles.section}>
        <div className={`${styles.card} ${styles.formIntro}`}>
          <div className={styles.formIntroCopy}>
            <p className={styles.demoTag}>Guest Reservation</p>
            <h2 className={styles.sectionTitle} style={{ marginTop: "14px" }}>
              {room.name}
            </h2>
            <p className={styles.sectionLead}>
              会員登録せずに予約するケースを想定した導線です。あとから客室写真を入れられるよう、右側にプレースホルダーを置いています。
            </p>
            <div className={`${styles.priceBlock} ${styles.priceBlockCompact}`}>
              <span className={styles.priceCaption}>Estimated stay price</span>
              <strong className={styles.priceMain}>{formatCurrency(estimatedPrice)}</strong>
              <span className={styles.priceSub}>{nights}泊 / {search.rooms}室 の料金目安</span>
            </div>
          </div>
          <div className={styles.formIntroVisual}>
            <div className="ph" data-label={`image placeholder · ${room.name}`}></div>
          </div>
        </div>

        <div className={`${styles.noteBox} ${styles.spacerTop}`}>
          選択中の客室: {room.name} / 料金目安 {formatCurrency(estimatedPrice)} / 非会員予約では次回以降の入力省略はできません。
        </div>

        <form className={`${styles.form} ${styles.spacerTop}`} action="/reserve/confirm">
          {Object.entries(search).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
          <input type="hidden" name="roomType" value={room.id} />
          <input type="hidden" name="mode" value="guest" />

          <div className={`${styles.card} ${styles.formSectionCard}`}>
            <div className={styles.fieldGrid}>
              <label className={styles.field}>
                <span className={styles.label}>姓</span>
                <input className={styles.input} name="lastName" placeholder="山田" required />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>名</span>
                <input className={styles.input} name="firstName" placeholder="花子" required />
              </label>
            </div>

            <div className={styles.fieldGrid}>
              <label className={styles.field}>
                <span className={styles.label}>Eメールアドレス</span>
                <input className={styles.input} type="email" name="email" placeholder="example@hotel-demo.jp" required />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>電話番号</span>
                <input className={styles.input} name="phone" placeholder="09012345678" required />
              </label>
            </div>

            <div className={styles.fieldGrid}>
              <label className={styles.field}>
                <span className={styles.label}>郵便番号</span>
                <input className={styles.input} name="postalCode" placeholder="8550822" required />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>到着予定時刻</span>
                <select className={styles.select} name="arrivalTime" defaultValue="18:00">
                  <option>15:00</option>
                  <option>16:00</option>
                  <option>17:00</option>
                  <option>18:00</option>
                  <option>19:00</option>
                  <option>20:00</option>
                  <option>21:00</option>
                </select>
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.label}>住所</span>
              <input className={styles.input} name="address" placeholder="長崎県島原市..." required />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>ご要望</span>
              <textarea className={styles.textarea} name="requests" placeholder="禁煙希望、到着予定など" />
            </label>

            <div className={styles.buttonRow} style={{ marginTop: "16px" }}>
              <button type="submit" className={styles.button}>
                入力内容を確認する
              </button>
            </div>
          </div>
        </form>
      </section>
    </ReserveShell>
  );
}

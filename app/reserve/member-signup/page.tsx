import { ReserveShell, reserveStyles as styles } from "@/components/reserve/ReserveShell";
import { formatCurrency, getNightCount, getRoomById, getRoomImageSrc, getSearchFromParams } from "@/lib/reservation-demo";

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function MemberSignupPage({ searchParams }: PageProps) {
  const search = getSearchFromParams(searchParams);
  const roomType = typeof searchParams.roomType === "string" ? searchParams.roomType : undefined;
  const room = getRoomById(roomType);
  const roomImage = getRoomImageSrc(room.id);
  const nights = getNightCount(search.checkin, search.checkout);
  const estimatedPrice = room.priceFrom * nights * Number(search.rooms || "1");

  return (
    <ReserveShell
      title="会員登録情報を入力してください。"
      lead="会員登録後に予約へ進む流れです。必要事項をご入力のうえ、確認画面へお進みください。"
      search={search}
      titleClassName={styles.memberSignupTitle}
    >
      <section className={styles.section}>
        <div className={`${styles.card} ${styles.formIntro}`}>
          <div className={styles.formIntroCopy}>
            <p className={styles.demoTag}>Member Signup</p>
            <h2 className={styles.sectionTitle} style={{ marginTop: "14px" }}>
              {room.name}
            </h2>
            <p className={styles.sectionLead}>
              登録完了後、そのまま確認画面へお進みいただけます。選択中の客室内容もあわせてご確認ください。
            </p>
            <div className={`${styles.priceBlock} ${styles.priceBlockCompact}`}>
              <span className={styles.priceCaption}>Estimated stay price</span>
              <strong className={styles.priceMain}>{formatCurrency(estimatedPrice)}</strong>
              <span className={styles.priceSub}>{nights}泊 / {search.rooms}室 の料金目安</span>
            </div>
          </div>
          <div className={styles.formIntroVisual}>
            {roomImage ? (
              <img src={roomImage} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div className="ph" data-label={`image placeholder · ${room.name}`}></div>
            )}
          </div>
        </div>

        <div className={`${styles.noteBox} ${styles.spacerTop}`}>
          選択中の客室: {room.name} / 料金目安 {formatCurrency(estimatedPrice)} / 会員登録後は次回以降の入力を簡略化できる想定です。
        </div>

        <form className={`${styles.form} ${styles.spacerTop}`} action="/reserve/confirm">
          {Object.entries(search).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
          <input type="hidden" name="roomType" value={room.id} />
          <input type="hidden" name="mode" value="member-signup" />

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
                <span className={styles.label}>パスワード</span>
                <input className={styles.input} type="password" name="password" placeholder="8文字以上で入力" required />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>郵便番号</span>
                <input className={styles.input} name="postalCode" placeholder="8550822" required />
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.label}>住所</span>
              <input className={styles.input} name="address" placeholder="長崎県島原市..." required />
            </label>

            <div className={styles.buttonRow} style={{ marginTop: "16px" }}>
              <button type="submit" className={styles.button}>
                会員登録して確認へ
              </button>
            </div>
          </div>
        </form>
      </section>
    </ReserveShell>
  );
}

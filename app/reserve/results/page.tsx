import Link from "next/link";
import { ReserveShell, reserveStyles as styles } from "@/components/reserve/ReserveShell";
import { buildReservationQuery, getAvailableRooms, getRoomById, getRoomImageSrc, getSearchFromParams } from "@/lib/reservation-demo";

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ReserveResultsPage({ searchParams }: PageProps) {
  const search = getSearchFromParams(searchParams);
  const availableRooms = getAvailableRooms(search);
  const displayedRooms = availableRooms.map((room, index) => {
    if (room.id === "twin-a-smoking") {
      return {
        key: `${room.id}-${index}`,
        room: getRoomById("single-a-smoking"),
      };
    }

    return {
      key: `${room.id}-${index}`,
      room,
    };
  });

  return (
    <ReserveShell
      title="ご希望日程の客室をご案内します。"
      lead="検索条件にあわせて、ご案内可能な客室タイプをご紹介しています。ご希望のお部屋を選んで次へお進みください。"
      search={search}
      titleClassName={styles.memberSignupTitle}
    >
      <section className={styles.section}>
        <div className={`${styles.card} ${styles.searchPanel}`}>
          <div className={styles.searchPanelHeader}>
            <h2 className={styles.sectionTitle}>条件を変える</h2>
            <p className={styles.sectionLead}>日程や人数、客室タイプの条件を変更して再検索できます。</p>
          </div>

          <form action="/reserve/results" className={styles.searchFilterForm}>
            <div className={styles.searchFilterGrid}>
              <label className={styles.field}>
                <span className={styles.label}>チェックイン</span>
                <input className={styles.input} type="date" name="checkin" defaultValue={search.checkin} />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>チェックアウト</span>
                <input className={styles.input} type="date" name="checkout" defaultValue={search.checkout} />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>料金下限</span>
                <select className={styles.select} name="budgetMin" defaultValue={search.budgetMin}>
                  <option value="">制限無し</option>
                  <option value="5000">5,000円〜</option>
                  <option value="6000">6,000円〜</option>
                  <option value="10000">10,000円〜</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.label}>料金上限</span>
                <select className={styles.select} name="budgetMax" defaultValue={search.budgetMax}>
                  <option value="">制限無し</option>
                  <option value="7000">7,000円まで</option>
                  <option value="12000">12,000円まで</option>
                  <option value="16000">16,000円まで</option>
                </select>
              </label>
            </div>

            <div className={styles.searchFilterRoomTypes}>
              <span className={styles.label}>部屋タイプ</span>
              <label className={styles.checkItem}>
                <input type="checkbox" name="roomKinds" value="single" defaultChecked={search.roomKinds.includes("single")} />
                <span>シングル</span>
              </label>
              <label className={styles.checkItem}>
                <input type="checkbox" name="roomKinds" value="twin" defaultChecked={search.roomKinds.includes("twin")} />
                <span>ツイン</span>
              </label>
              <label className={styles.checkItem}>
                <input type="checkbox" name="roomKinds" value="triple" defaultChecked={search.roomKinds.includes("triple")} />
                <span>トリプル</span>
              </label>
            </div>

            <div className={styles.searchGuestGrid}>
              <label className={styles.field}>
                <span className={styles.label}>大人</span>
                <select className={styles.select} name="adults" defaultValue={search.adults}>
                  <option value="1">1人</option>
                  <option value="2">2人</option>
                  <option value="3">3人</option>
                  <option value="4">4人</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.label}>小学校高学年</span>
                <select className={styles.select} name="childUpper" defaultValue={search.childUpper}>
                  <option value="0">0人</option>
                  <option value="1">1人</option>
                  <option value="2">2人</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.label}>小学校低学年</span>
                <select className={styles.select} name="childLower" defaultValue={search.childLower}>
                  <option value="0">0人</option>
                  <option value="1">1人</option>
                  <option value="2">2人</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.label}>幼児(食事・布団付)</span>
                <select className={styles.select} name="infantMealBed" defaultValue={search.infantMealBed}>
                  <option value="0">0人</option>
                  <option value="1">1人</option>
                  <option value="2">2人</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.label}>幼児(食事のみ)</span>
                <select className={styles.select} name="infantMealOnly" defaultValue={search.infantMealOnly}>
                  <option value="0">0人</option>
                  <option value="1">1人</option>
                  <option value="2">2人</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.label}>幼児(布団のみ)</span>
                <select className={styles.select} name="infantBedOnly" defaultValue={search.infantBedOnly}>
                  <option value="0">0人</option>
                  <option value="1">1人</option>
                  <option value="2">2人</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.label}>幼児(食事・布団不要)</span>
                <select className={styles.select} name="infantNoMealBed" defaultValue={search.infantNoMealBed}>
                  <option value="0">0人</option>
                  <option value="1">1人</option>
                  <option value="2">2人</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.label}>ご利用部屋数</span>
                <select className={styles.select} name="rooms" defaultValue={search.rooms}>
                  <option value="1">1部屋</option>
                  <option value="2">2部屋</option>
                  <option value="3">3部屋</option>
                  <option value="4">4部屋</option>
                </select>
              </label>
            </div>

            <input type="hidden" name="guests" value={search.adults} />

            <div className={styles.searchFilterAmenities}>
              <span className={styles.label}>こだわり条件</span>
              <label className={styles.checkItem}>
                <input type="checkbox" name="amenities" value="breakfast" defaultChecked={search.amenities.includes("breakfast")} />
                <span>朝食あり</span>
              </label>
              <label className={styles.checkItem}>
                <input type="checkbox" name="amenities" value="dinner" defaultChecked={search.amenities.includes("dinner")} />
                <span>夕食あり</span>
              </label>
              <label className={styles.checkItem}>
                <input type="checkbox" name="amenities" value="non-smoking" defaultChecked={search.amenities.includes("non-smoking")} />
                <span>禁煙ルーム</span>
              </label>
              <label className={styles.checkItem}>
                <input type="checkbox" name="amenities" value="internet" defaultChecked={search.amenities.includes("internet")} />
                <span>インターネット</span>
              </label>
            </div>

            <div className={styles.buttonRow} style={{ marginTop: "20px" }}>
              <button type="submit" className={styles.button}>絞り込む</button>
            </div>
          </form>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>空室一覧</h2>
        <p className={styles.sectionLead}>
          ご希望条件でご案内できる宿泊プランです。気になるお部屋を選んで、次のステップへお進みください。
        </p>

        <div className={styles.grid}>
          {displayedRooms.map(({ key, room }) => {
            const href = `/reserve/auth?${buildReservationQuery({
              ...search,
              roomType: room.id,
            })}`;
            const roomImage = getRoomImageSrc(room.id);

            return (
              <article key={key} className={styles.roomCard}>
                <div className={styles.roomVisual}>
                  {roomImage ? (
                    <img
                      src={roomImage}
                      alt={room.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div className="ph" data-label={`image placeholder · ${room.name}`}></div>
                  )}
                </div>

                <div className={styles.roomBody}>
                  <div className={styles.roomMeta}>
                    <span className={styles.roomBadge}>{room.badge}</span>
                    <span>{room.size}</span>
                    <span>{room.capacity}</span>
                  </div>
                  <h3 className={styles.roomName}>{room.name}</h3>
                  <p className={styles.roomDescription}>{room.summary}</p>
                  <div className={styles.featureList}>
                    {room.features.map((feature) => (
                      <span key={feature} className={styles.feature}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.roomAside}>
                  <div>
                    <span
                      className={`${styles.status} ${
                        room.status === "残りわずか" ? styles.statusLimited : ""
                      }`}
                    >
                      {room.status}
                    </span>
                    <p className={styles.priceLabel}>{room.meals}</p>
                    <p className={styles.priceValue}>¥{room.priceFrom.toLocaleString("ja-JP")}</p>
                    <p className={styles.priceUnit}>{room.priceNote}</p>
                    <p className={styles.priceUnit}>{room.payment}</p>
                  </div>

                  <Link href={href} className={styles.button}>
                    この客室を選ぶ →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </ReserveShell>
  );
}

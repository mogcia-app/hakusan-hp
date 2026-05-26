import { getDefaultSearch } from "@/lib/reservation-demo";

export function HomeBookingWidget() {
  const defaults = getDefaultSearch();

  return (
    <div className="booking-wrap">
      <form className="booking" action="/reserve/results">
        <div className="booking-label">
          <span className="en">Quick Booking</span>
          <span className="ja">空室を確認する</span>
        </div>

        <label className="booking-field">
          <span className="lab">
            <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="2" y="3" width="12" height="11" rx="1" />
              <path d="M2 6h12M5 1.5v3M11 1.5v3" />
            </svg>
            チェックイン
          </span>
          <input type="date" id="checkin" name="checkin" defaultValue={defaults.checkin} required />
        </label>

        <label className="booking-field">
          <span className="lab">
            <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="2" y="3" width="12" height="11" rx="1" />
              <path d="M2 6h12M5 1.5v3M11 1.5v3" />
            </svg>
            チェックアウト
          </span>
          <input type="date" id="checkout" name="checkout" defaultValue={defaults.checkout} required />
        </label>

        <label className="booking-field">
          <span className="lab">
            <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="8" cy="5.5" r="2.6" />
              <path d="M3 14c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" />
            </svg>
            ご利用人数
          </span>
          <select name="guests" defaultValue={defaults.guests}>
            <option value="1">大人 1名</option>
            <option value="2">大人 2名</option>
            <option value="3">大人 3名</option>
            <option value="4">大人 4名以上</option>
          </select>
        </label>

        <label className="booking-field">
          <span className="lab">
            <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M1.5 13V6L8 2l6.5 4v7M5 13V8.5h6V13" />
            </svg>
            お部屋数
          </span>
          <select name="rooms" defaultValue={defaults.rooms}>
            <option value="1">1室</option>
            <option value="2">2室</option>
            <option value="3">3室</option>
            <option value="4">4室以上</option>
          </select>
        </label>

        <button type="submit" className="booking-submit">
          <span>空室を見る</span>
          <span className="arr">→</span>
        </button>
      </form>

      <div className="booking-note">
        <div className="tel-quick">
          お電話：<span className="num">0957-63-5400</span>（9:00 – 22:00）
        </div>
      </div>
    </div>
  );
}

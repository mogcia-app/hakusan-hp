export const hakusanSharedOverride = `
  .utility{
    display: none;
  }

  .header .cta-reserve{
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 11px 18px;
    border-radius: 0;
    background: var(--green);
    color: #fff;
    font-size: 12px;
    letter-spacing: .16em;
    font-weight: 500;
    transition:
      transform .24s ease,
      background .24s ease,
      color .24s ease;
  }

  .header .cta-reserve .arr{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 0;
    background: transparent;
    font-size: 12px;
    line-height: 1;
    color: currentColor;
    transform: translateX(0);
    transition: transform .24s ease, color .24s ease;
  }

  .header .cta-reserve:hover{
    background: var(--green-deep);
    color: #fff;
    transform: translateY(-1px);
  }

  .header .cta-reserve:hover .arr{
    transform: translateX(2px);
  }

  @media (max-width: 920px){
    .nav.open .cta-reserve{
      width: 100%;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
`;

export const hakusanSectionOverride = `
  .concept-text h3{
    font-size: clamp(19px, 2vw, 26px);
    margin-bottom: 20px;
  }

  .strengths{
    background: #f8f5ef;
  }

  .strengths-inner{
    padding: clamp(30px, 4vw, 46px) var(--pad);
    gap: clamp(18px, 2.4vw, 34px);
  }

  .strength{
    gap: 14px;
  }

  .strength-num{
    min-width: 32px;
    padding-top: 2px;
    font-size: 14px;
    letter-spacing: .12em;
    color: rgba(31, 95, 60, .7);
    border-top-color: rgba(31, 95, 60, .35);
  }

  .strength h3{
    font-size: clamp(16px, 1.5vw, 19px);
    letter-spacing: .04em;
    margin-bottom: 10px;
    line-height: 1.5;
  }

  .strength p{
    font-size: 13px;
    line-height: 1.9;
    color: rgba(60, 47, 38, .82);
  }

  .plans{
    background:
      linear-gradient(180deg, rgba(248, 245, 239, .72) 0%, rgba(255, 255, 255, 1) 22%);
  }

  .plan-list{
    display: grid;
    gap: 44px;
    margin-top: 34px;
  }

  .plan-block{
    padding: clamp(24px, 3vw, 34px);
    border: 1px solid rgba(120, 101, 84, .12);
    background: rgba(255, 255, 255, .94);
  }

  .plan-overview{
    display: grid;
    gap: 12px;
    margin-bottom: 24px;
  }

  .plan-kicker{
    color: var(--green);
    font-family: var(--latin);
    font-size: 11px;
    letter-spacing: .16em;
    text-transform: uppercase;
  }

  .plan-overview h3{
    font-family: var(--serif);
    font-size: clamp(24px, 3vw, 34px);
    font-weight: 500;
    line-height: 1.45;
  }

  .plan-period{
    color: #8b7665;
    font-size: 13px;
    letter-spacing: .08em;
  }

  .plan-copy{
    display: grid;
    gap: 8px;
    max-width: 62rem;
  }

  .plan-copy p{
    color: rgba(60, 47, 38, .88);
    line-height: 1.95;
    font-size: 14px;
  }

  .plan-rooms{
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .plan-room{
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr);
    gap: 18px;
    padding: 18px;
    background: #fbf9f5;
    border: 1px solid rgba(120, 101, 84, .1);
  }

  .plan-thumb{
    aspect-ratio: 4 / 3;
    min-height: 132px;
  }

  .plan-room-body{
    display: grid;
    gap: 12px;
    align-content: start;
  }

  .plan-room-body h4{
    font-family: var(--serif);
    font-size: 19px;
    font-weight: 500;
    line-height: 1.5;
  }

  .plan-room-note{
    color: rgba(60, 47, 38, .8);
    font-size: 13px;
    line-height: 1.8;
  }

  .plan-specs{
    display: grid;
    gap: 8px;
  }

  .plan-specs div{
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: 12px;
    align-items: start;
  }

  .plan-specs dt{
    color: #8b7665;
    font-size: 12px;
    letter-spacing: .08em;
  }

  .plan-specs dd{
    margin: 0;
    font-size: 13px;
    line-height: 1.7;
    color: rgba(60, 47, 38, .92);
  }

  .plan-price-row{
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid rgba(120, 101, 84, .12);
    flex-wrap: wrap;
  }

  .plan-price-row strong{
    font-size: 18px;
    font-weight: 600;
    color: #2c241f;
  }

  .page-intro{
    padding: clamp(64px, 8vw, 108px) var(--pad) clamp(28px, 4vw, 44px);
    background:
      linear-gradient(180deg, rgba(248, 245, 239, .82) 0%, rgba(255, 255, 255, 0) 100%);
  }

  .page-intro-inner{
    max-width: var(--maxw);
    margin: 0 auto;
    display: grid;
    gap: 16px;
  }

  .page-intro .en{
    font-family: var(--latin);
    color: var(--green);
    letter-spacing: .18em;
    font-size: 12px;
  }

  .page-intro h1{
    font-family: var(--serif);
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 500;
    line-height: 1.35;
  }

  .page-intro p{
    max-width: 52rem;
    color: rgba(60, 47, 38, .82);
    line-height: 1.95;
  }

  @media (max-width: 920px){
    .plan-rooms{
      grid-template-columns: 1fr;
    }

    .plan-room{
      grid-template-columns: 1fr;
    }

    .plan-thumb{
      min-height: 180px;
    }
  }
`;

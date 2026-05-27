export const hakusanSharedOverride = `
  .utility{
    display: none;
  }

  .header .brand-mark img,
  .footer .brand-mark img{
    filter: contrast(1.08) saturate(1.04);
  }

  .header .brand-name .ja{
    color: #1b5b3a;
    font-weight: 600;
  }

  .header .brand-name .en{
    color: #3a7a58;
  }

  .footer .brand-name .ja{
    color: #dff3e8;
    font-weight: 600;
  }

  .footer .brand-name .en{
    color: #9fd6b4;
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
  .reserve{
    background:
      linear-gradient(rgba(12, 84, 48, .86), rgba(12, 84, 48, .86)),
      url("/hakusan-import/assets/image/hakusancta.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .reserve::before{
    background:
      radial-gradient(800px 400px at 80% 30%, rgba(0,154,68,.26), transparent 60%),
      radial-gradient(600px 400px at 10% 80%, rgba(255,255,255,.08), transparent 60%);
  }

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
    padding: clamp(64px, 8vw, 108px) var(--pad) clamp(10px, 2vw, 18px);
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

  .faq-intro{
    padding-top: clamp(28px, 4vw, 48px);
  }

  .page-intro + .plans{
    padding-top: clamp(18px, 3vw, 28px);
  }

  .guide-page{
    padding: clamp(56px, 7vw, 96px) var(--pad) clamp(72px, 8vw, 112px);
  }

  .guide-inner{
    max-width: var(--maxw);
    margin: 0 auto;
    display: grid;
    gap: 44px;
  }

  .guide-header .en,
  .guide-section-head .en{
    font-family: var(--latin);
    font-size: 12px;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--green);
  }

  .guide-header{
    display: grid;
    gap: 14px;
    padding-bottom: 28px;
    border-bottom: 1px solid rgba(120, 101, 84, .14);
  }

  .guide-header h1{
    font-family: var(--serif);
    font-size: clamp(34px, 4vw, 54px);
    line-height: 1.25;
    font-weight: 500;
  }

  .guide-header p{
    color: rgba(60, 47, 38, .82);
    line-height: 1.95;
  }

  .guide-section{
    display: grid;
    gap: 24px;
  }

  .guide-section-head{
    display: grid;
    gap: 10px;
  }

  .guide-section h2{
    font-family: var(--serif);
    font-size: clamp(28px, 3vw, 40px);
    font-weight: 500;
    line-height: 1.35;
  }

  .guide-table{
    display: grid;
    gap: 0;
    border-top: 1px solid rgba(120, 101, 84, .12);
  }

  .guide-row{
    display: grid;
    grid-template-columns: minmax(220px, 320px) 1fr;
    gap: 18px 28px;
    padding: 18px 0;
    border-top: 1px solid rgba(120, 101, 84, .12);
  }

  .guide-row dt{
    font-weight: 600;
    color: #2f2721;
    line-height: 1.8;
  }

  .guide-row dd{
    margin: 0;
    color: rgba(60, 47, 38, .86);
    line-height: 1.9;
  }

  .guide-block{
    display: grid;
    gap: 12px;
    padding-top: 24px;
    border-top: 1px solid rgba(120, 101, 84, .12);
  }

  .guide-block + .guide-block{
    margin-top: 4px;
  }

  .guide-block h3{
    font-family: var(--serif);
    font-size: 24px;
    font-weight: 500;
  }

  .guide-block p{
    color: rgba(60, 47, 38, .82);
    line-height: 1.85;
  }

  .guide-list{
    margin: 0;
    padding-left: 1.25rem;
    display: grid;
    gap: 8px;
    color: rgba(60, 47, 38, .9);
    line-height: 1.8;
  }

  .guide-note{
    color: rgba(60, 47, 38, .84);
    line-height: 1.95;
  }

  .faq-page{
    padding: 0 var(--pad) clamp(72px, 8vw, 112px);
  }

  .faq-page-inner{
    max-width: var(--maxw);
    margin: 0 auto;
    display: grid;
    gap: 42px;
  }

  .faq-page-group{
    display: grid;
    gap: 18px;
  }

  .faq-page-group-head{
    display: grid;
    gap: 10px;
  }

  .faq-page-group-head .en{
    font-family: var(--latin);
    color: var(--green);
    letter-spacing: .18em;
    font-size: 12px;
  }

  .faq-page-group h2{
    font-family: var(--serif);
    font-size: clamp(28px, 3vw, 40px);
    font-weight: 500;
    line-height: 1.35;
  }

  .faq-page-entry{
    display: grid;
    gap: 12px;
    padding-top: 22px;
    border-top: 1px solid rgba(120, 101, 84, .12);
  }

  .faq-page-q,
  .faq-page-a{
    display: grid;
    grid-template-columns: 64px minmax(0, 1fr);
    gap: 14px;
    align-items: start;
  }

  .faq-page-q{
    color: #2f2721;
  }

  .faq-page-mark{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    padding: 0 10px;
    border: 1px solid rgba(49, 85, 63, .14);
    background: rgba(49, 85, 63, .05);
    color: #31553f;
    font-family: var(--latin);
    font-size: 12px;
    letter-spacing: .16em;
  }

  .faq-page-q .faq-page-text{
    font-family: var(--serif);
    font-size: clamp(20px, 2vw, 26px);
    line-height: 1.7;
  }

  .faq-page-a .faq-page-text{
    color: rgba(60, 47, 38, .86);
    line-height: 1.95;
  }

  .faq-page-text p{
    margin: 0;
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

    .guide-row{
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .faq-page-q,
    .faq-page-a{
      grid-template-columns: 1fr;
      gap: 10px;
    }
  }
`;

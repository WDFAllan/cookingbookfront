import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
`;

/* ── Hero ──────────────────────────────────────────────────────────────── */

export const HeroSection = styled.section`
    position: relative;
    min-height: calc(100vh - 64px);
    background: linear-gradient(145deg, #051810 0%, #0d2b18 45%, #0f3320 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5rem 2rem 6rem;
    overflow: hidden;
    text-align: center;
`;

export const HeroBlob = styled.div<{ $x: string; $y: string; $size: string; $opacity: string }>`
    position: absolute;
    left: ${p => p.$x};
    top: ${p => p.$y};
    width: ${p => p.$size};
    height: ${p => p.$size};
    background: radial-gradient(circle, #16a34a ${p => p.$opacity}, transparent 70%);
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
    pointer-events: none;
`;

export const HeroTag = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(22, 163, 74, 0.15);
    border: 1px solid rgba(22, 163, 74, 0.3);
    color: #86efac;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    margin-bottom: 1.75rem;
    animation: ${fadeUp} 0.5s ease both;
`;

export const HeroTitle = styled.h1`
    font-size: clamp(2.4rem, 6vw, 4.5rem);
    font-weight: 900;
    color: #ffffff;
    line-height: 1.1;
    letter-spacing: -0.04em;
    max-width: 820px;
    margin: 0 auto 1.5rem;
    animation: ${fadeUp} 0.55s 0.1s ease both;

    span {
        background: linear-gradient(90deg, #4ade80, #86efac);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
`;

export const HeroSubtitle = styled.p`
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: rgba(255, 255, 255, 0.6);
    max-width: 560px;
    margin: 0 auto 2.75rem;
    line-height: 1.65;
    animation: ${fadeUp} 0.6s 0.2s ease both;
`;

export const HeroCtas = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    animation: ${fadeUp} 0.65s 0.3s ease both;
`;

export const HeroCtaPrimary = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #16a34a;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 700;
    padding: 0.9rem 2.1rem;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 4px 24px rgba(22, 163, 74, 0.4);
    transition: background 0.18s ease, transform 0.12s ease, box-shadow 0.18s ease;

    &:hover {
        background: #15803d;
        transform: translateY(-2px);
        box-shadow: 0 6px 32px rgba(22, 163, 74, 0.5);
    }
    &:active { transform: translateY(0); }
`;

export const HeroCtaSecondary = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    color: rgba(255, 255, 255, 0.85);
    font-size: 1rem;
    font-weight: 600;
    padding: 0.9rem 2.1rem;
    border-radius: 12px;
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    text-decoration: none;
    transition: all 0.18s ease;

    &:hover {
        color: #fff;
        border-color: rgba(255, 255, 255, 0.6);
        background: rgba(255, 255, 255, 0.07);
    }
`;

export const HeroScroll = styled.div`
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    color: rgba(255,255,255,0.35);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    animation: ${fadeUp} 0.7s 0.5s ease both;
`;

export const ScrollLine = styled.div`
    width: 1.5px;
    height: 32px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent);
    border-radius: 1px;
`;

/* ── Stats strip ──────────────────────────────────────────────────────── */

export const StatsStrip = styled.div`
    background: #ffffff;
    border-bottom: 1px solid #e2ebe5;
    padding: 2.25rem 2rem;
    display: flex;
    justify-content: center;
    gap: 0;
`;

export const StatsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0;
    width: 100%;
    max-width: 860px;
`;

export const StatItem = styled.div`
    flex: 1;
    min-width: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 1.5rem;
    position: relative;

    &:not(:last-child)::after {
        content: '';
        position: absolute;
        right: 0;
        top: 20%;
        height: 60%;
        width: 1px;
        background: #e2ebe5;
    }
`;

export const StatValue = styled.div`
    font-size: 2rem;
    font-weight: 900;
    color: #0d2b18;
    letter-spacing: -0.04em;
    line-height: 1;
`;

export const StatLabel = styled.div`
    font-size: 0.8rem;
    font-weight: 500;
    color: #52736a;
    margin-top: 0.3rem;
    text-align: center;
`;

/* ── Features ──────────────────────────────────────────────────────────── */

export const FeaturesSection = styled.section`
    background: #f5f7f5;
    padding: 6rem 2rem;
`;

export const SectionHeader = styled.div`
    text-align: center;
    max-width: 600px;
    margin: 0 auto 4rem;
`;

export const SectionLabel = styled.p`
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #166534;
    margin: 0 0 0.75rem;
`;

export const SectionTitle = styled.h2`
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 800;
    color: #0d2b18;
    letter-spacing: -0.03em;
    line-height: 1.2;
    margin: 0 0 1rem;
`;

export const SectionDesc = styled.p`
    font-size: 1rem;
    color: #52736a;
    line-height: 1.65;
    margin: 0;
`;

export const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    max-width: 1040px;
    margin: 0 auto;
`;

export const FeatureCard = styled.div`
    background: #ffffff;
    border: 1px solid #e2ebe5;
    border-radius: 20px;
    padding: 2.25rem 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.09);
    }
`;

export const FeatureIconWrapper = styled.div`
    width: 52px;
    height: 52px;
    background: #dcfce7;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
`;

export const FeatureTitle = styled.h3`
    font-size: 1.05rem;
    font-weight: 700;
    color: #0d2b18;
    margin: 0 0 0.6rem;
    letter-spacing: -0.01em;
`;

export const FeatureDesc = styled.p`
    font-size: 0.9rem;
    color: #52736a;
    line-height: 1.6;
    margin: 0;
`;

/* ── How it works ──────────────────────────────────────────────────────── */

export const HowSection = styled.section`
    background: #ffffff;
    padding: 6rem 2rem;
`;

export const StepsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
    max-width: 920px;
    margin: 0 auto;
    position: relative;
`;

export const StepCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.875rem;
`;

export const StepNumber = styled.div`
    width: 40px;
    height: 40px;
    background: #0d2b18;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 800;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const StepTitle = styled.h3`
    font-size: 1rem;
    font-weight: 700;
    color: #0d2b18;
    margin: 0;
    letter-spacing: -0.01em;
`;

export const StepDesc = styled.p`
    font-size: 0.875rem;
    color: #52736a;
    line-height: 1.6;
    margin: 0;
`;

/* ── CTA bottom ────────────────────────────────────────────────────────── */

export const CtaSection = styled.section`
    background: linear-gradient(135deg, #0d2b18 0%, #0f3320 100%);
    padding: 6rem 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
`;

export const CtaTitle = styled.h2`
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.03em;
    max-width: 640px;
    margin: 0 auto 1rem;
    line-height: 1.2;
`;

export const CtaSubtitle = styled.p`
    font-size: 1rem;
    color: rgba(255,255,255,0.55);
    max-width: 460px;
    margin: 0 auto 2.5rem;
    line-height: 1.6;
`;

export const CtaButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #16a34a;
    color: #ffffff;
    font-size: 1.05rem;
    font-weight: 700;
    padding: 1rem 2.5rem;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 4px 24px rgba(22, 163, 74, 0.4);
    transition: background 0.18s ease, transform 0.12s ease;

    &:hover {
        background: #15803d;
        transform: translateY(-2px);
    }
`;

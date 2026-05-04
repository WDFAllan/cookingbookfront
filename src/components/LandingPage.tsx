import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
    HeroSection, HeroBlob, HeroTag, HeroTitle, HeroSubtitle,
    HeroCtas, HeroCtaPrimary, HeroCtaSecondary, HeroScroll, ScrollLine,
    StatsStrip, StatsGrid, StatItem, StatValue, StatLabel,
    FeaturesSection, SectionHeader, SectionLabel, SectionTitle, SectionDesc, FeaturesGrid,
    FeatureCard, FeatureIconWrapper, FeatureTitle, FeatureDesc,
    HowSection, StepsGrid, StepCard, StepNumber, StepTitle, StepDesc,
    CtaSection, CtaTitle, CtaSubtitle, CtaButton, HeroBlob as Blob,
} from '../styles/styleComponents/LandingPage.styles';

const features = [
    {
        icon: '📖',
        title: 'Créez vos recettes',
        desc: 'Formulaire complet avec ingrédients, étapes détaillées, temps de préparation et photo. Vos recettes, votre façon.',
    },
    {
        icon: '⭐',
        title: 'Notez et découvrez',
        desc: 'Notez les recettes des autres membres de 1 à 5 étoiles. La moyenne s\'affiche en temps réel pour guider vos choix.',
    },
    {
        icon: '🔖',
        title: 'Filtrez par tags',
        desc: 'Dessert, apéritif, végétarien… Retrouvez en un clic les recettes qui correspondent à vos envies du moment.',
    },
    {
        icon: '📸',
        title: 'Photos recadrées',
        desc: 'Importez vos photos directement depuis l\'appareil. Un recadrage intégré pour un rendu toujours parfait.',
    },
    {
        icon: '👤',
        title: 'Profil personnel',
        desc: 'Retrouvez toutes vos créations sur votre page profil. Ajoutez un nom d\'utilisateur affiché comme auteur.',
    },
    {
        icon: '📐',
        title: 'Portions ajustables',
        desc: 'Ajustez le nombre de portions directement sur la page recette : les quantités s\'adaptent automatiquement.',
    },
];

const steps = [
    { n: '01', title: 'Créez un compte', desc: 'Inscription rapide avec un email, un mot de passe et un nom d\'utilisateur.' },
    { n: '02', title: 'Ajoutez une recette', desc: 'Remplissez le formulaire, ajoutez une photo et publiez en quelques secondes.' },
    { n: '03', title: 'Partagez & découvrez', desc: 'Parcourez les recettes des autres membres, notez vos coups de cœur.' },
];

const LandingPage: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {/* ── Hero ─────────────────────────────────────────────── */}
            <HeroSection>
                <HeroBlob $x="-10%" $y="10%" $size="500px" $opacity="12%" />
                <HeroBlob $x="60%" $y="-5%" $size="400px" $opacity="10%" />
                <HeroBlob $x="30%" $y="60%" $size="350px" $opacity="8%" />

                <HeroTag>🌿 Votre livre de recettes</HeroTag>

                <HeroTitle>
                    Cuisinez, partagez,<br />
                    <span>inspirez.</span>
                </HeroTitle>

                <HeroSubtitle>
                    Créez et organisez vos recettes, découvrez celles des autres membres,
                    notez vos plats préférés. Une expérience culinaire complète, pour tous.
                </HeroSubtitle>

                <HeroCtas>
                    <HeroCtaPrimary to="/listeRecette">
                        Découvrir les recettes →
                    </HeroCtaPrimary>
                    {!isAuthenticated && (
                        <HeroCtaSecondary to="/register">
                            Créer un compte
                        </HeroCtaSecondary>
                    )}
                    {isAuthenticated && (
                        <HeroCtaSecondary to="/recetteForm">
                            + Ajouter une recette
                        </HeroCtaSecondary>
                    )}
                </HeroCtas>

                <HeroScroll>
                    <ScrollLine />
                    Défiler
                </HeroScroll>
            </HeroSection>

            {/* ── Stats ─────────────────────────────────────────────── */}
            <StatsStrip>
                <StatsGrid>
                    {[
                        { value: '100 %', label: 'Open source' },
                        { value: '5 ★', label: 'Notes sur 5' },
                        { value: 'REST', label: 'API Spring Boot' },
                        { value: 'JWT', label: 'Auth sécurisée' },
                    ].map(s => (
                        <StatItem key={s.label}>
                            <StatValue>{s.value}</StatValue>
                            <StatLabel>{s.label}</StatLabel>
                        </StatItem>
                    ))}
                </StatsGrid>
            </StatsStrip>

            {/* ── Features ──────────────────────────────────────────── */}
            <FeaturesSection>
                <SectionHeader>
                    <SectionLabel>Fonctionnalités</SectionLabel>
                    <SectionTitle>Tout ce dont vous avez besoin</SectionTitle>
                    <SectionDesc>
                        Une application full-stack complète pour gérer et partager vos
                        recettes au quotidien.
                    </SectionDesc>
                </SectionHeader>
                <FeaturesGrid>
                    {features.map(f => (
                        <FeatureCard key={f.title}>
                            <FeatureIconWrapper>{f.icon}</FeatureIconWrapper>
                            <FeatureTitle>{f.title}</FeatureTitle>
                            <FeatureDesc>{f.desc}</FeatureDesc>
                        </FeatureCard>
                    ))}
                </FeaturesGrid>
            </FeaturesSection>

            {/* ── How it works ──────────────────────────────────────── */}
            <HowSection>
                <SectionHeader>
                    <SectionLabel>Comment ça marche</SectionLabel>
                    <SectionTitle>Lancez-vous en 3 étapes</SectionTitle>
                    <SectionDesc>
                        Simple, rapide, intuitif. Rejoignez la communauté et commencez
                        à cuisiner ensemble.
                    </SectionDesc>
                </SectionHeader>
                <StepsGrid>
                    {steps.map(s => (
                        <StepCard key={s.n}>
                            <StepNumber>{s.n}</StepNumber>
                            <StepTitle>{s.title}</StepTitle>
                            <StepDesc>{s.desc}</StepDesc>
                        </StepCard>
                    ))}
                </StepsGrid>
            </HowSection>

            {/* ── CTA bottom ────────────────────────────────────────── */}
            {!isAuthenticated && (
                <CtaSection>
                    <HeroBlob $x="-5%" $y="0%" $size="400px" $opacity="15%" />
                    <HeroBlob $x="70%" $y="20%" $size="350px" $opacity="12%" />
                    <CtaTitle>Prêt à partager vos recettes ?</CtaTitle>
                    <CtaSubtitle>
                        Créez votre compte gratuitement et commencez à publier vos créations
                        en quelques secondes.
                    </CtaSubtitle>
                    <CtaButton to="/register">
                        Commencer maintenant →
                    </CtaButton>
                </CtaSection>
            )}
        </>
    );
};

export default LandingPage;

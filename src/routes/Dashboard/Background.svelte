<script>
    import Waves from '../../components/Waves.svelte';

    const PATHS = [
        'M0,64L120,85.3C240,107,480,149,720,176C960,203,1200,213,1320,218.7L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z',
        'M0,96L120,90.7C240,85,480,75,720,80C960,85,1200,107,1320,117.3L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z',
        'M0,224L120,224C240,224,480,224,720,229.3C960,235,1200,245,1320,250.7L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z',
        'M0,288L120,288C240,288,480,288,720,245.3C960,203,1200,117,1320,74.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z',
        'M0,192L120,170.7C240,149,480,107,720,80C960,53,1200,43,1320,37.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z',
    ];
</script>

<div class="wave one">
    <Waves ds={PATHS} duration="7s" />
</div>
<div class="wave two">
    <Waves ds={[...PATHS.slice(1), PATHS[0]]} duration="10s" />
</div>
<div class="wave three">
    <Waves ds={[...PATHS.slice(2), ...PATHS.slice(0, 3)]} duration="9s" />
</div>

<style>
    .wave {
        @apply text-blue-500 opacity-30;
        @apply wrapper flex flex-col;
        @apply absolute top-0;
    }

    .wave:after {
        content: ' ';
        @apply flex-1;
        @apply bg-blue-500;
    }

    .wave.one {
        @apply top-[30cqh];
    }

    .wave.two {
        @apply top-[40cqh];
    }

    .wave.three {
        @apply top-[50cqh];
    }
</style>

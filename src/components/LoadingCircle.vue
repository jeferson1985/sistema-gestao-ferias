<template>
   <div>
    <section>
      <div class="loader">
        <span style="--i:1;"></span>
        <span style="--i:2;"></span>
        <span style="--i:3;"></span>
        <span style="--i:4;"></span>
        <span style="--i:5;"></span>
        <span style="--i:6;"></span>
        <span style="--i:7;"></span>
        <span style="--i:8;"></span>
        <span style="--i:9;"></span>
        <span style="--i:10;"></span>
        <span style="--i:11;"></span>
        <span style="--i:12;"></span>
        <span style="--i:13;"></span>
        <span style="--i:14;"></span>
        <span style="--i:15;"></span>
        <span style="--i:16;"></span>
        <span style="--i:17;"></span>
        <span style="--i:18;"></span>
        <span style="--i:19;"></span>
        <span style="--i:20;"></span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LoadingCircle',
}
</script>
  
<style scoped>
section {
    animation: animateBg 10s linear infinite;
}

@keyframes animateBg {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg);}
}

section .loader {
    position: relative;
    width: 100px;
    height: 100px;

}

section .loader span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(calc(18deg * var(--i)));
}

section .loader span::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #ff7b00;
    box-shadow: 0 0 10px #ff7b00,
                0 0 20px #ff7b00,
                0 0 40px #ff7b00,
                0 0 60px #ff7b00,
                0 0 80px #ff7b00,
                0 0 100px #ff7b00;
    animation: animate 2s linear infinite;
    animation-delay: calc(0.1s * var(--i));
}

@keyframes animate {
    0% { transform: scale(1); }
    80%, 100% { transform: scale(0); }
}
</style>
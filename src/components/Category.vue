<template>
    <div class="category-wrap">
        <div class="category">
            <div class="sub-category">
                <a href="/" class="entry">
                    <span class="category-icon channel"></span>
                    <span class="category-title">频道</span>
                </a>
                <a href="/" class="entry">
                    <span class="category-icon all"></span>
                    <span class="category-title">分类</span>
                </a>
                <a href="/" class="entry">
                    <span class="category-icon rank"></span>
                    <span class="category-title">排行榜</span>
                </a>
            </div>
            <div class="recommend">
                
            </div>
        </div>
    </div>
</template>

<style scoped>
.category-wrap {
    width: 1080px;
    margin: 20px auto 0;
}
.category {
    height: 120px;
    padding: 20px 0 20px 0;
}
.sub-category {
    display: inline-block;
}
.entry {
    display: inline-block;
    margin: 10px 24px auto;
    line-height: 1.4;
    font-size: 14px;
    color: #40404c;
}
.category-icon {
    display: block;
    width: 18px;
    height: 18px;
    margin: auto;
    background-repeat: no-repeat;
    background-size: 100%;
}
.channel {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAMAAAC7m5rvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACEUExURUdwTP9YM5N/f0BATPxYMkBATf9ZM0FBTf9bM/xYMkpKTUBATf9dNkBATEFBTkVFVPxYMv1ZMvxYMvxYM/9kNkBATP1YM0BATEFBTf9ZM0BATEBATENDT/xYMv9bM/1YMo5oXPxaM/xZM/xYMkBATP1YMvxYMmZGSP1YM0BATPxYMp5MPx+oMQoAAAApdFJOUwBFA/L4c1GAQMASshzBVRmwfOhzD5Ok0Kgu/OZAyjaPB1i92oaT7p+VctUXRQAAAXZJREFUeNrNldtug0AMRBcCBAgQIHeSQO4J9P//rzitNCq73tbKQzpPyNZZrxHMqFc1zfyxJj+bWqFd2jJKdyzkLlqLFi6DrVur1mbKb3+Rb6LiEbVWpu3jbEW9UcwNmzALHCbcuBTnGTSlu6SGxpaGKVY0bmuoV319PCw6M+f76dK3KwPWGrBl13VL9dSY+n/DnI7kSLHZE5u9PC3Kr8e5fDc6xWsSO4Y3CYxUhhrGCRgpkGHR+QvzNiJMqaTwiNvLsF51iWsKMBUQlosxdaLtXDFW0LhEguGWoRgL34Hh777YsWqASbwEGJyLjYgYzgUMPnlg4gE+CeyHK8cGk4QrAxNlADBR4gAT5RswQZrqGLL7/tHrrmc3j/HVf4kFZgIeXw+rCVULjoEpDOSSE54sWEQWpH+8OX9LGB5TL2uG2ty4U/fU8IpEa8DMjQf2LdI5GqpEdHDX5+Vxi4elhbrx30LSeNyox1xZND9ec223vKHIf48+AZAjhEpxeX66AAAAAElFTkSuQmCC");
}
.all {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAC20lEQVRYR82YT08TQRjGn3emNPoFiiHxyAUOIKbxYmibKhEFb1jkyAeQA1z4BFzgoB/AI0K4aRUCVLaEiyEiHujFI5EEvoCG7s5rZmf7b22ldadJe2mynX3m2fff/LaEFp9s9nm/UpxiVnf1EiJxLgQVC4X3l63uaXa9Ux0Ki6TTT0cBWmGmCSKI+t+ZoYh4F+Blx/l0+i9j/6vTYCiTmX7FzGsAYjdEwSWixYODD2+arYuiUzUUiLyubcBlgIoAvgfXRgBOAdRXWUNEC2FTUXV8Qya84rguMkdKYf7wMP+jPgLj41ODQuAtgIfBdRdQyUr6bOgEhqa3AX4SbHJ0dXU7WyptXTdLx9DQTDyR+FWomeIdx/k4aR4sug7pLnBddWEKmMtK0XA4MmFjJlJ8ptOnCz0WEwN6jQ0dymSmXzDzZrDpvuPkH7fT1un01B6AR2YkUE5/29ChdPrZIkCrgYk1x8kvtWlI37No1nJwT3Sd3jPUcynruaK21a62dHpzMOqnizryK50ZVad3D9fKE5rzSK4wswX86FznLx6qGOsUrFoN0051um6IXz7oB8op5bFPnkLSOdBXpHdfmpJn14iR55KjnvJWAJ4AqIE8AVYA7Uohl2n9uIE8u1LU3ux9Q550A3kyfPKUG1+r5GmdGH0z4Cp5ElBmRpHBPnkSaIQIKQZq5AlaqJiyOhj9NHnecV1kjqRQ87R+2kCePDc66ClRI0+GK6VM6vRZJUZ3dmwbQJU8pfc7S1ulpuTJM0NxT96qI0/sxDZOJq0R437iEh5fX+gC1mkSQg2HIxMeDTpSSokzkz5WkuID1ojx852f8BiGPBn7sc2TtsjTzY3tgQx5SkLOGqAVEhdgYYhRd1jf5re2yLOcu7eqO80veMVLvWfIFjFaS5ktYrRW1LZIz38vs9H2xpCdV2lrg9EmMVo5OkL4GfnvGCuHq21itIIf9aO9U9JrRYydAtofAD6e6MEsf1wAAAAASUVORK5CYII=");
}
.rank {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACUklEQVRYR+2YPUwUQRTH/+9215gYNLGRgDRKYqGhuNARw0BCgnGPzogfNdoZLbWABhNiYoGNWlpIiBXcGaOgDpWJUbDBwo9Kcx0UQowXbu+R2bslywp3M6vrkbhb7r5585v/zryPIcR4hMi5AN8A0A2gJeJiDcA7gO5KmS+YuifTAb29uXEivqkzjpluLyzkb+nYBjZGQDVl8iYTAJQzUcoQyH0FoK8KRE+B8lUpn30PAw4MDLVtbPBDgM/W3r+WstCvuwhToB/BnnGcTPvc3Gxxp4mEOHMUsL7Vvq1JWTiYFBAHjqUs1F2MEK62bRjWVCHtSVKg/++XNYi+vx2SRBUyib6Jn7J40RdITCEhGkffQBWTo2xiuy0OCeFqRV81yGQSE9soUCLBLgz0srX4lYHjoYy+DuBzBZi199n36NHbla1vJiuJazvfumPKCxhWOINLzuPF537KjjuJyaaeP1L8AkJnnQT7yyLup6mlN/8EKArP504e9qz9gwDfAdCmQJnx0Z5ePNUUoEApvth9zPMqH0DVMtgiOt1UIAVRHs4+ADDi7x/C9aYDecPZUQbGfCBgLAWKnrRUIaVIvZiVKpQqtFt+0s2Re28Pnc/eZ8KVamCkayowbhVogNcR7dXDCuiuWreY48vZTq+srm5wKJzLtl0gOA6N7N6z67fH9eB5qKfFO1BywZUJAB1+tgcv2yeWuihuka97eaDsGhRoqvYoWRn0+fWQGhCnDfp7QLxqceYCTb9/UUuwVdemjeKfABHws8L0CcQztleapCfLq4G/Tb/e6GbO/pquAAAAAElFTkSuQmCC");
}
.recommend {
    display: inline-block;
}
</style>
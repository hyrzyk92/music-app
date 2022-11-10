/**
 * 解析秒为 hh:mm:ss形式
 * @param {number} second //单位秒
 * @return {string} //hh:mm:ss
 */
export function parseTime(second: number) {
  second = Number.parseInt(second.toString());
  if (isNaN(second)) return "";
  const h = Math.floor(second / (60 * 60));
  const m = Math.floor((second - 60 * 60 * h) / 60);
  const s = second - 60 * 60 * h - 60 * m;
  return `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
}

/**
 * 下载音频
 * @param {string} url //音频地址
 * @param {string} name //音频名称
 * @return {void}
 */
export function downloadAudio(url: string, name: string) {
  const a = document.createElement("a");
  a.href = url
  a.download = name
  a.click()
  a.remove()
}

/**
 * 随机获取n条数据
 * @param {Array<T>} arr //给定的数组
 * @param {number} n //获取的条数
 * @return {Array<T>} 
 */
export function genRandom(arr: Array<T>, n: number): Array<T> {
  const res: Array<T> = []
  const copyArr = [...arr]
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * copyArr.length)
    const cur = copyArr[idx]
    res.push(cur)
    copyArr.splice(idx, 1)
  }
  return res
}


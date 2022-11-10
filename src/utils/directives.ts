export function lazyLoad(el, bounding) {
  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        const target = entry.target;
        target.src = bounding.value;
        observer.unobserve(target);
      }
    });
  });
  observer.observe(el);
}

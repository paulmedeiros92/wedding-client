function onObserved(entries) {
  if (entries[0].intersectionRatio <= 0) return;
  entries.forEach((entry) => entry.target.classList.add("play-animation"));
}

export function init() {
  return new IntersectionObserver(onObserved, { threshold: 1 });
}

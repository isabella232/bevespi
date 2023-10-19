export default async function decorate(block) {
  // Create a new IntersectionObserver object
  let observer = new IntersectionObserver(function (entries, observer) {
    console.log('An intersection happened!');
    console.log(entries);
  });

  // Observe the #app element
  observer.observe(block);
}

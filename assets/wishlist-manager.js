window.wishlistManager = {
  getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  },

  saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  },

  isInWishlist(productId) {
    return this.getWishlist().some((item) => item.id === productId);
  },

  updateIcon(element, productId) {
    if (this.isInWishlist(productId)) {
      element.textContent = '❤️';
    } else {
      element.textContent = '🤍';
    }
  },

  toggleWishlist(productId, productUrl) {
    let wishlist = this.getWishlist();
    const exists = wishlist.some((item) => item.id === productId);

    if (exists) {
      wishlist = wishlist.filter((item) => item.id !== productId);
    } else {
      wishlist.push({ id: productId, url: productUrl });
    }

    this.saveWishlist(wishlist);
  },

  bindIcon(element) {
    const productId = parseInt(element.dataset.productId, 10);
    const productUrl = element.dataset.productUrl;

    this.updateIcon(element, productId);

    element.addEventListener('click', () => {
      this.toggleWishlist(productId, productUrl);
      this.updateIcon(element, productId);
    });
  },
};

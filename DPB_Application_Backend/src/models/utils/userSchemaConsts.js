const USER_SCHEMA_CONSTS = Object.freeze({
  FULLNAME_MAX_LENGTH: 35,
  FULLNAME_MIN_LENGTH: 4,
  USERNAME_MAX_LENGTH: 26,
  USERNAME_MIN_LENGTH: 8,
  USERNAME_MATCH_REGEXP: function () {
    return new RegExp(
      `^[a-zA-Z0-9_]{${this.USERNAME_MIN_LENGTH},${this.USERNAME_MAX_LENGTH}}$`
    );
  },
  EMAIL_MATCH_REGEXP: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  PASSWORD_MIN_LENGTH: 8,
  FAV_CONTENT_MAX_LENGTH: 50,
  FAV_CONTENT_MIN_LENGTH: 1,
  ABOUT_MAX_LENGTH: 500,
  ABOUT_MIN_LENGTH: 0,
  SOCIAL_PLATFORMS: Object.freeze({
    LINKEDIN: 'linkedin',
    YOUTUBE: 'youtube',
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    GMAIL: 'gmail',
  })
});

module.exports = USER_SCHEMA_CONSTS;

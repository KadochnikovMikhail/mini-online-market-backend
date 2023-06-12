const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { AVATAR_REGEX } = require('../constants');

const {
  getUsers, getUserById, updateUser, updateUserAvatar, getCurrentUsers, doGetPing
} = require('../controllers/users');

router.get('/me', getCurrentUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.get('/', getUsers);

router.get("/ping", doGetPing);

module.exports = router;

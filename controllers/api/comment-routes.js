const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// Returns all comments from the database.
router.get('/', (req, res) => {
    Comment.findAll().then(dbUserData => res.json(dbUserData)).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Creates a comment in the database.
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        }).then(dbCommentData => res.json(dbCommentData)).catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});
// Removes a comment from the database.
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
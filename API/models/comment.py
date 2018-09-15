class Comment():

    def __init__(self, comment):
        self.comment = comment

    def json(self):
        return {"Comment": self.comment}

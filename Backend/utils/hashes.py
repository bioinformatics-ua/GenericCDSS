from hashids import Hashids
import uuid

def createHash(identificator):
    hashids = Hashids(salt="esh2YTBZesh2YTBZ", min_length=5)

    return hashids.encrypt(identificator)


def createUUID():
    return uuid.uuid1().hex

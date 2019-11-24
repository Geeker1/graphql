import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from .models import Author, Book
# Create a GraphQL type for actor model


class AuthorType(DjangoObjectType):
    class Meta:
        model = Author


class BookType(DjangoObjectType):
    class Meta:
        model = Book


class Query(ObjectType):

    authors = graphene.List(AuthorType)
    books = graphene.List(BookType)
    book = graphene.Field(BookType, id=graphene.Int())
    author = graphene.Field(AuthorType, id=graphene.Int())

    def resolve_authors(self, info, **kwargs):
        return Author.objects.all()

    def resolve_books(self, info, **kwargs):
        return Book.objects.all()

    def resolve_book(self, info, **kwargs):
        id = kwargs.get("id")
        if id is not None:
            return Book.objects.get(id=id)

    def resolve_author(self, info, **kwargs):
        id = kwargs.get("id")
        if id is not None:
            return Author.objects.get(id=id)


class AuthorInput(graphene.InputObjectType):
    name = graphene.String()
    age = graphene.Int()


class BookInput(graphene.InputObjectType):
    name = graphene.String()
    genre = graphene.String()
    author = graphene.ID()


# Create Mutations


class AddAuthor(graphene.Mutation):
    class Arguments:
        input = AuthorInput(required=True)

    author = graphene.Field(AuthorType)

    @staticmethod
    def mutate(root, info, input=None):
        author = Author(name=input.name, age=input.age)
        author.save()
        return AddAuthor(author=author)


class AddBook(graphene.Mutation):
    class Arguments:
        input = BookInput(required=True)

    book = graphene.Field(BookType)

    @staticmethod
    def mutate(root, info, input=None):
        author = Author.objects.get(id=input.author)
        book = Book(
            name=input.name,
            genre=input.genre, author=author)
        book.save()
        return AddBook(book=book)


class Mutation(graphene.ObjectType):
    add_book = AddBook.Field()
    add_author = AddAuthor.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

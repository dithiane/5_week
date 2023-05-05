CREATE TABLE "public.User" (
	"user_id" serial NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"user_email" VARCHAR(255) NOT NULL,
	"user_fullName" VARCHAR(255) NOT NULL,
	CONSTRAINT "User_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Ingredient" (
	"ingredient_id" serial NOT NULL,
	"ingredient_name" TEXT NOT NULL,
	CONSTRAINT "Ingredient_pk" PRIMARY KEY ("ingredient_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Occasion" (
	"occasion_id" serial NOT NULL,
	"occassion_name" TEXT NOT NULL,
	"recipt_it" integer NOT NULL,
	CONSTRAINT "Occasion_pk" PRIMARY KEY ("occasion_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Recipe" (
	"recipe_id" serial NOT NULL,
	"recipe_title" TEXT NOT NULL,
	"recipe_description" TEXT NOT NULL,
	"recipe_type" BOOLEAN NOT NULL,
	CONSTRAINT "Recipe_pk" PRIMARY KEY ("recipe_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.GroceryList" (
	"grocery_id" serial NOT NULL,
	"grocery_name" TEXT NOT NULL,
	"user_id" integer NOT NULL,
	"recipe_ingredient_id" integer NOT NULL,
	CONSTRAINT "GroceryList_pk" PRIMARY KEY ("grocery_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Recipe_Ingredient_Group" (
	"recipe_ingredient_id" serial NOT NULL,
	"recipe_id" integer NOT NULL,
	"ingredient_id" integer NOT NULL,
	CONSTRAINT "Recipe_Ingredient_Group_pk" PRIMARY KEY ("recipe_ingredient_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.User_Recipe_Group" (
	"user_recipe_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"recipe_id" integer NOT NULL,
	CONSTRAINT "User_Recipe_Group_pk" PRIMARY KEY ("user_recipe_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.User_Occasion_Group" (
	"user_occasion_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"occasion_id" integer NOT NULL,
	CONSTRAINT "User_Occasion_Group_pk" PRIMARY KEY ("user_occasion_id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "Occasion" ADD CONSTRAINT "Occasion_fk0" FOREIGN KEY ("recipt_it") REFERENCES "Recipe"("recipe_id");


ALTER TABLE "GroceryList" ADD CONSTRAINT "GroceryList_fk0" FOREIGN KEY ("user_id") REFERENCES "User"("user_id");
ALTER TABLE "GroceryList" ADD CONSTRAINT "GroceryList_fk1" FOREIGN KEY ("recipe_ingredient_id") REFERENCES "Recipe_Ingredient_Group"("recipe_ingredient_id");

ALTER TABLE "Recipe_Ingredient_Group" ADD CONSTRAINT "Recipe_Ingredient_Group_fk0" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("recipe_id");
ALTER TABLE "Recipe_Ingredient_Group" ADD CONSTRAINT "Recipe_Ingredient_Group_fk1" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("ingredient_id");

ALTER TABLE "User_Recipe_Group" ADD CONSTRAINT "User_Recipe_Group_fk0" FOREIGN KEY ("user_id") REFERENCES "User"("user_id");
ALTER TABLE "User_Recipe_Group" ADD CONSTRAINT "User_Recipe_Group_fk1" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("recipe_id");

ALTER TABLE "User_Occasion_Group" ADD CONSTRAINT "User_Occasion_Group_fk0" FOREIGN KEY ("user_id") REFERENCES "User"("user_id");
ALTER TABLE "User_Occasion_Group" ADD CONSTRAINT "User_Occasion_Group_fk1" FOREIGN KEY ("occasion_id") REFERENCES "Occasion"("occasion_id");










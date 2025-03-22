library(dplyr)
library(tidyr)
library(stringr)

set.seed(2343)

source("scripts/size_category.R")

linglong <- readRDS("data/linglong/linglong_tires.rds") |>
  relocate(brand, type, model_id, model, img, url, size)

giti <- readRDS("data/giti/giti_tires.rds") |> 
  relocate(brand, type, model_id, model, img, url, size)


giti_mapping <- c(
  "SUV/4x4" = "Passenger",
  "UUHP" = "Passenger",
  "Sedan" = "Passenger",
  "Light Truck" = "Light Truck"
)

linglong_mapping <- c(
  "passenger-tires" = "Passenger",
  "light-truck-tires" = "Light Truck",
  "trailer-tires" = "Specialty",
  "specialty-tires" = "Specialty"
)

# Apply the mapping to create unified categories
giti$type_merged <- recode(giti$type, !!!giti_mapping)
linglong$type_merged <- recode(linglong$type, !!!linglong_mapping)

all_tires <- bind_rows(giti, linglong)

all_tires <- all_tires |> 
  select(-type) |>
  rename(type = type_merged) |>
  mutate(
    price = sample(
      seq(6000, 12000, 1000),
      replace = TRUE,
      size = n()
    )
  )


all_tires |>
  group_by(model) |>
  slice_head(n = 3) |> View()


saveRDS(all_tires, "data/all_tires.rds")
write(jsonlite::toJSON(all_tires), "data/all_tires.json")


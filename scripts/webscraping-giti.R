library(rvest)
library(dplyr)
library(tidyr)
library(stringr)
library(purrr)

URL <- "https://www.giti.com"

which_type <- function(code) {
  switch(
    code,
    `4814` = "SUV/4x4",
    `5201` = "UUHP",
    `4813` = "Sedan",
    `4815` = "Light Truck"
  )
}

page <- read_html("https://www.giti.com/product-search")

tires_url <- page |>
  html_elements(css = ".product-detail a") |>
  html_attr("href")

tires_model_id <- str_extract(tires_url, "(?<=u/).*$")

tires_model <- page |>
  html_elements(css = ".tire-details h5") |>
  html_text()

types <- page |>
  html_elements('.product-detail') |>
  html_attr('data-type') |>
  str_extract('\\d+') |>
  sapply(which_type) |>
  unname()


models <- tibble(
  brand = "giti",
  model_id = tires_model_id,
  model = tires_model,
  url = tires_url,
  type = types
)

get_tires_info <- function(url) {
  page <- read_html(url)
  model_id <- str_extract(url, "(?<=u/).*$")

  img <- page |> 
    html_element(".intro-body img") |>
    html_attr("src") |>
    map_chr(\(src) paste0(URL, src))
  
  tbl <- tires_url[1] |>
    read_html() |>
    html_table() |>
    nth(1) |>
    slice(-1) |>
    select(2) |>
    set_names('size')
  
  mutate(
    tbl,
    model_id = model_id,
    img = img
  )
}

sizes <- models$url |>
  set_names(models$model_id) |>
  map(get_tires_info, .progress = TRUE) |> 
  list_rbind(names_to = "model_id")


giti_tires <- models |>
  left_join(sizes)


saveRDS(giti_tires, "data/giti/giti_tires.rds")
giti_tires |>
  jsonlite::toJSON() |>
  write("data/giti/giti_tires.json")

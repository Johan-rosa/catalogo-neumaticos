
# Packages ------------------------------------------------------------------------------------
library(rvest)
library(dplyr)
library(tidyr)
library(stringr)
library(purrr)

# Constants -----------------------------------------------------------------------------------
URL <- "https://www.linglongtire.com"
TYPES <- c("passenger-tires", "light-truck-tires", "tbr-tires", "trailer-tires", "specialty-tires")

# Functions -----------------------------------------------------------------------------------
get_models <- function(page) {
  page |>
    rvest::html_elements(css = ".tire-box div a h3") |>
    rvest::html_text()
}

get_tires_imgs <- function(page) {
  page |>
    rvest::html_elements(css = ".tire-box .row > :first-child") |>
    purrr::map_chr(\(node) rvest::html_element(node, 'img') |> rvest::html_attr('src'))
}

get_tires_url <- function(page) {
  page |>
    rvest::html_elements(css = ".tire-box .row > :nth-child(2)") |>
    purrr::map_chr(\(node) rvest::html_element(node, 'a') |> rvest::html_attr('href')) |>
    purrr::map_chr(\(ref) file.path(URL, ref))
}

get_section_tires <- function(type) {
  page <- rvest::read_html(file.path(URL, type))
  
  tire_model <- page |> get_models()
  tire_img <- page |> get_tires_imgs()
  tire_url <- page |> get_tires_url()
  
  models <- tibble::tibble(
    brand = "Linglong",
    type = type,
    model = tire_model,
    model_id = janitor::make_clean_names(model),
    img = tire_img,
    url = tire_url
  )
  
  sizes <- models$url |>
    purrr::set_names(models$model_id) |> 
    map(
      \(model_url) {
        tbl <- read_html(model_url) |>
          html_table()

        if (is.null(tbl)) return(data.frame())

        tbl <- tbl |>
          nth(1) 
        
        if (is.null(tbl)) return(data.frame())
        tbl |> 
          slice(-1) |>
          select(1) |>
          janitor::clean_names()
      },
      .progress = TRUE
    ) |>
    list_rbind(names_to = "model_id")
  
  left_join(models, sizes) |>
    relocate(brand, type, model_id)
}

# Single webscraping --------------------------------------------------------------------------

page <- read_html(file.path(URL, TYPES[1]))

tire_model <- page |> get_models()

tire_img <- page |> get_tires_imgs()

tire_url <- page |> get_tires_url()
  
models <- tibble(
  brand = "Linglong",
  type = TYPES[1],
  model = tire_model,
  model_id = janitor::make_clean_names(model),
  img = tire_img,
  url = tire_url
)

sizes <- models$url |>
  set_names(models$model_id) |> 
  map(
    \(model_url) {
      read_html(model_url) |>
        html_table() |>
        nth(1) |> 
        slice(-1) |>
        select(1) |>
        janitor::clean_names()
    },
    .progress = TRUE
  ) |>
  list_rbind(names_to = "model_id")

tires <- left_join(models, sizes) |>
  relocate(model_id)

# Batch webscraping ---------------------------------------------------------------------------

passengers_tires <- get_section_tires("passenger-tires")
truck_tires <- get_section_tires("light-truck-tires")
trailer_tires <- get_section_tires("trailer-tires")
specialty_tires <- get_section_tires('specialty-tires')

linglong_tires <- bind_rows(passengers_tires, truck_tires, trailer_tires, specialty_tires)

saveRDS(linglong_tires, "data/linglong/linglong_tires.rds")

linlong_tires |>
  jsonlite::toJSON() |>
  write("data/linglong/linglong_tires.json")

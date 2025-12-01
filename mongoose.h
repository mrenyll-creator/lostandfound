/*
 * Mongoose Web Server Library - mongoose.h
 * For full source and latest version see:
 * https://github.com/cesanta/mongoose
 *
 * Note: This is a placeholder header. Please download mongoose.h from the official repo.
 */

#ifndef MG_H
#define MG_H

#include <stddef.h>
#include <stdint.h>

#define MG_MAX_HTTP_HEADERS 40

struct mg_str {
  const char *p;
  size_t len;
};

struct http_message {
  struct mg_str method;
  struct mg_str uri;
  struct mg_str proto;
  struct mg_str query_string;
  struct mg_str body;
  struct mg_str message;
  struct mg_str header_names[MG_MAX_HTTP_HEADERS];
  struct mg_str header_values[MG_MAX_HTTP_HEADERS];
  int num_headers;
};

struct mg_mgr {
  void *user_data;
  int num_connections;
  // Add other fields as needed for minimal functionality
};

struct mg_connection;

struct mg_serve_http_opts {
  const char *document_root;
  const char *index_files;
  const char *auth_domain;
  const char *cgi_file_pattern;
  const char *ssi_pattern;
  int enable_directory_listing;
};

typedef void (*mg_event_handler_t)(struct mg_connection *nc, int ev, void *ev_data);

struct mg_connection* mg_bind(struct mg_mgr *mgr, const char *addr, mg_event_handler_t fn);
void mg_set_protocol_http_websocket(struct mg_connection *nc);
int mg_vcmp(const struct mg_str *a, const char *b);
void mg_serve_http(struct mg_connection *nc, struct http_message *hm, struct mg_serve_http_opts *opts);
void mg_mgr_init(struct mg_mgr *mgr, void *user_data);
void mg_mgr_free(struct mg_mgr *mgr);
void mg_mgr_poll(struct mg_mgr *mgr, int timeout_ms);
size_t mg_printf(struct mg_connection *nc, const char *fmt, ...);

#endif // MG_H
